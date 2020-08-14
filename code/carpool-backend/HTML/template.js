exports.template = {
    register: `
    <!doctype html>
    <html>
    <form name="RegisterDatas" method="post" action="./register_process">
        <p> 회원가입 창입니다. </p>
        <p> - 이름을 입력해 주세요.</p>
        <p><input type="text" name="name" placeholder="이름"></p>
        <p> - 아이디를 입력해 주세요.</p>
        <p><input type="text" name="id" placeholder="ID"></p>
        <p> - 비밀번호를 입력해 주세요.</p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p><input type="submit"></p>
    </form>
    </html>`,
    login: `
    <!doctype html>
    <html>
    <form name="LoginDatas" method="post" action="./login_process">
        <p> 로그인 창입니다. </p>
        <p> - 아이디를 입력해 주세요.</p>
        <p><input type="text" name="id" placeholder="ID"></p>
        <p> - 비밀번호를 입력해 주세요.</p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p><input type="submit"></p>
    </form>
    </html>`,
    home: function (req) {
        if (this.isLogin(req)) {
            return `
            <html>
            <p> <a href="/auth/logout">Logout</a> <p>
            <p> hello, ${req.user.name} <p>
            </html>`;
        } else {
            return `
            <html>
            <p> <a href="/auth/login">Login</a> <a href="/auth/register">Register</a> <p>
            </html>`;
        }
    },
    isLogin: (req) => {
        if (req.user == undefined) return false;
        else return true;
    },
    chat: `
    <html>
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        body {
          font: 13px Helvetica, Arial;
        }
    
        form {
          background: #000;
          padding: 3px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
    
        form input {
          border: 0;
          padding: 10px;
          width: 90%;
          margin-right: .5%;
        }
    
        form button {
          width: 9%;
          background: rgb(130, 224, 255);
          border: none;
          padding: 10px;
        }
    
        #messages {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
    
        #messages li {
          padding: 5px 10px;
        }
    
        #messages li:nth-child(odd) {
          background: #eee;
        }
      </style>
    </head>
    <body>
    <select>
      <option value="Room1">Room1</option>
      <option value="Room2">Room2</option>
    </select>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off"/>
      <button>Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      $(() => {
        const name = prompt('What your name');
        const socket = io();
        let room = ['room1', 'room2'];
        let num = 0;
    
        socket.emit('joinRoom', num, name);
    
        $('select').change(() => {
          socket.emit('leaveRoom', num, name);
          num++;
          num = num % 2;
          socket.emit('joinRoom', num, name);
        });
    
    
        $('form').submit(() => {
          socket.emit('chat message', num, name, $('#m').val());
          $('#m').val('');
          return false;
        });
    
        socket.on('chat message', (name, msg) => {
          $('#messages').append($('<li>').text(name + '  :  ' +msg));
        });
    
        socket.on('leaveRoom', (num, name) => {
          $('#messages').append($('<li>').text(name + '    leaved ' + room[num] + ' :('));
        });
    
        socket.on('joinRoom', (num, name) => {
          $('#messages').append($('<li>').text(name + '    joined ' + room[num] + ':)'));
        });
      });
    </script>
    </body>
    </html>
`

}