<!DOCTYPE html>
<html lang="en" ng-app="projectWhatUp">
  <head>
    <meta charset="utf-8">
    <title>WhatUp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="<?= base_url('assets/css/bootstrap.css') ?>" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="<?= base_url('assets/css/bootstrap-responsive.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/js/libs/jquery-ui/jquery-ui.min.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/css/style.css') ?>" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="<?= base_url('assets/ico/favicon.ico') ?>">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?= base_url('assets/ico/apple-touch-icon-144-precomposed.png') ?>">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?= base_url('assets/ico/apple-touch-icon-114-precomposed.png') ?>">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?= base_url('assets/ico/apple-touch-icon-72-precomposed.png') ?>">
    <link rel="apple-touch-icon-precomposed" href="<?= base_url('assets/ico/apple-touch-icon-57-precomposed.png') ?>">
  </head>

  <body>

    <header class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="header-container">          
          <a class="brand" href="#">WhatUp</a>
          <div id="new_post_btn_container">
            <div class="nav-collapse collapse">
              <a href="#posts/new" class="btn btn-primary pull-right" style="margin-left: 10px;" id="new_post_btn">
                <i class="icon-pencil"></i>
                New Post
              </a>
              <a href="http://projectwhatup.us:5000/logout" class="btn btn-primary pull-right" id="logout_btn">
                <i class="icon-remove-circle"></i>
		Logout
              </a>



            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
