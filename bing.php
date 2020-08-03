<?php

$idx = $_POST['idx'];
if(!isset($idx)) {
	header("Location: /");
}
$url = "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=$idx&n=1&mkt=zh-CN";
$data = json_decode(file_get_contents($url), true);
$res = $data['images'][0];
$bing = [
    'url' => 'https://cn.bing.com' . $res['url'],
    'disc' => $res['copyright'],
    'date' => substr($res['enddate'], 0, 4) . '-' . substr($res['enddate'], 4, 2) . '-' . substr($res['enddate'], 6, 2),
];
echo json_encode($bing);