<?php

  $url = $_SERVER['SERVER_NAME'];
  $port = $_SERVER['SERVER_PORT'];

  echo "URL: " . $url;
  echo "PORT: " . $port;

  foreach ($_SERVER as $key => $value) {
    # code...
    echo "KEY: " . $key . " VALUE: " . $value . "<br>";
  }

?>
