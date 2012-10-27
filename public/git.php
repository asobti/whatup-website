<?php

// only honor requests when they come from one of these ips
$github_pub_ips = array(
	'207.97.227.253',
	'50.57.128.197',
	'108.171.174.178'
);

if (in_array($_SERVER['REMOTE_ADDR'], $github_pub_ips) {
	if ($_POST['payload']) {
		// do a git pull
		`git pull origin master`;
	}
}
