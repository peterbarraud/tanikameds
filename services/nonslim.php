<?php
  $api_call = getrestapiname();
  $args = getrestapiargs();
  call_user_func_array($api_call, $args);
  function getrestapiname(){
    $parts = explode('/',$_SERVER['REQUEST_URI']);
    $getnextpart = false;
    $restapiname = '';
    foreach ($parts as $part){
      if ($getnextpart){
        $restapiname = $part;
        break;
      }
      if ($part == 'rest.api.nonslim.php'){
        $getnextpart = true;
      }
    }
    return $restapiname;
  }
  function getrestapiargs(){
    $parts = explode('/',$_SERVER['REQUEST_URI']);
    $getnext_to_next_part = 0;
    $args = array();
    foreach ($parts as $part){
      if ($getnext_to_next_part > 0){
        $getnext_to_next_part++;
      }
      if ($getnext_to_next_part > 2){
        array_push($args,$part);
      }
      if ($part == 'rest.api.nonslim.php'){
        $getnext_to_next_part = 1;
      }
    }
    return $args;
  }



 ?>
