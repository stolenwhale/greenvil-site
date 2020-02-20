<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Greenvil</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap&subset=cyrillic"
    rel="stylesheet">
  <link rel="shortcut icon" href="/images/fav.png" type="image/x-icon">
  <link rel="stylesheet" href="/css/main.css" />
  <meta name="yandex-verification" content="ca3d2d1abee679d9" />
</head>

<body>
  <div class="close-page-animation-item"></div>
  <div class="open-page-animation-item"></div>
  <section class="viewport">
    <div id="scroll-container" class="scroll-container">
      <div class="content">
        <header>
          <div class="main-menu floating">
            <div class="wrapper">
              <div class="container-fluid">
                <div class="header row">
                  <div class="d-none d-lg-block col-lg-12">
                    <ul class="menu">
                      <li class="item floating-up">
                        <a href="/index.php" class="logo">
                          <img src="/images/logo.svg" alt="">
                        </a>
                      </li>
                      <li class="item">
                        <a href="/index.php">О поселке</a>
                      </li>
                      <li class="item">
                        <a href="/page/location.php">Расположение</a>
                      </li>
                      <li class="item">
                        <a href="/page/select.php">Виды домов</a>
                      </li>
                      <li class="item">
                        <a href="/page/contacts.php">Контакты</a>
                      </li>
                      <li class="item button">
                        <button class="open-popup">Оставить заявку</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mobile-header row">
                  <div class="col-5 col-md-3 d-lg-none">
                    <a href="/index.php" class="logo">
                      <img src="/images/logo.svg" alt="">
                    </a>
                  </div>
                  <div class="d-flex col-2 offset-5 col-md-1 offset-md-8 d-lg-none justify-content-end">
                    <button class="burger">
                      <div class="burger__line"></div>
                      <div class="burger__line"></div>
                      <div class="burger__line"></div>
                    </button>
                  </div>
                </div>
                <div class="mobile-menu closed row">
                  <div class="col-12">
                    <ul class="menu">
                      <li class="item">
                        <a href="/index.php">О поселке</a>
                      </li>
                      <li class="item">
                        <a href="/page/location.php">Расположение</a>
                      </li>
                      <li class="item">
                        <a href="/page/select.php">Виды домов</a>
                      </li>
                      <li class="item">
                        <a href="/page/contacts.php">Контакты</a>
                      </li>
                      <li class="item button">
                        <button class="open-popup">Оставить заявку</button>
                      </li>
                    </ul>
                    <div class="triangle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <div class="wrapper">
              <div class="container-fluid">
                <div class="row">
                  <div class="popup">
                    <div class="header">
                      <h2>
                        Оставить заявку
                      </h2>
                      <div class="close-button">
                        <img src="/images/close-popup.svg" alt="">
                      </div>
                    </div>
                    <p class="filling-error d-none">Одно или несколько полей заполнены неверно</p>
                    <form action="" class="form">
                      <p class="personal-information">
                        <input type="text" class="name" id="name" placeholder="Ваше имя" required='required'>
                        <input type="text" class="phone" placeholder="Телефон" required='required'>
                      </p>
                      <div class="bot">
                        <p class="accept">
                          <input type="checkbox" id="accept-check" required='required' />
                          <label for="accept-check">Согласен с условиями обработки персональных данных</label>
                        </p>
                        <input class="submit-request" type="submit" value="оставить заявку">
                      </div>
                    </form>
                    <p class="thank-you-message">
                      Спасибо за обращение!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="to-top">
            <img src="/images/up-arrow.svg">
          </div> -->
        </header>