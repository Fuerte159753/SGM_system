<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" href="{{ asset('resourses/iconpes.png') }}">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Login-Master</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            background: url('{{ asset('resourses/img1.jpg') }}') no-repeat center center fixed;
            background-size: cover;
        }
        .juan {
            width: 80%;
            max-width: 420px;
            background: rgba(144, 144, 144, 0.315);
            border: 2px solid rgba(255, 255, 255, .2);
            backdrop-filter: blur(20px);
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);
            color: #fff;
            border-radius: 10px;
            padding: 30px 40px;
            text-align: center;
        }
        .juan h1 {
            font-size: 36px;
            margin-bottom: 20px;
        }
        .input-box {
            position: relative;
            width: 100%;
            height: 50px;
            margin: 30px 0;
        }
        .input-box input {
            width: 85%;
            height: 50%;
            background: rgba(0, 0, 0, 0.3);
            border: none;
            outline: none;
            border: 2px solid rgba(255, 255, 255, .2);
            border-radius: 40px;
            font-size: 16px;
            color: #fff;
            padding: 20px;
            padding-right: 45px;
        }
        .input-box input::placeholder {
            color: #fff;
        }
        .input-box i {
            position: absolute;
            right: 20px;
            top: 60%;
            transform: translateY(-50%);
            font-size: 20px;
            color: #fff;
        }
        .remenmber-forgot {
            display: flex;
            justify-content: space-between;
            font-size: 14.5px;
            margin: -15px 0 15px;
        }
        .remenmber-forgot label input {
            accent-color: #fff;
            margin-right: 3px;
        }
        .remenmber-forgot a {
            color: #fff;
            text-decoration: none;
        }
        .remenmber-forgot a:hover {
            text-decoration: underline;
        }
        .btn {
            width: 100%;
            height: 45px;
            background: #075985;
            border: none;
            outline: none;
            border-radius: 40px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
            cursor: pointer;
            color: #969696;
            font-size: 16px;
            font-weight: 600;
        }
        .btn:hover {
            background: #0284c7;
            color: #f9f9f9;

        }
    </style>
</head>
<body>
    <div class="juan">
        <form method="post">
            @csrf
            <h1>Developer</h1>
            <!--credenciales 
              username: adimin(12)
              password: eladmin100
            -->
            <div class="input-box">
                <input type="text" name="username" placeholder="Usuario" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Contraseña" required>
                <i class='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" class="btn">Entrar</button>
        </form>
    </div>
</body>
</html>