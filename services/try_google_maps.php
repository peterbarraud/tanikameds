<?php

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, 'https://maps.googleapis.com/maps/api/geocode/json?address=' . rawurlencode($address));

curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);

$json = curl_exec($curl);

curl_close ($curl);


?>