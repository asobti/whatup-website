<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MY_Controller {

	public function index()
	{
		$this->load->view("header");
		$this->load->view("home");
		$this->load->view('view_post_tpl');
		$this->load->view("footer");
	}


	public function posts()
	{
		$this->load->view("header");
		$this->load->view("post");
		$this->load->view("footer");
	}

}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
