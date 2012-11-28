<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MY_Controller {

	public function index()
	{
		$this->load->view("header");
		$this->load->view("home");
		
		// include templates
		$this->load->view('view_post_tpl');
		$this->load->view('new_post_btn_tpl');
		$this->load->view('new_post_form_tpl');
		$this->load->view('modal_dialog_tpl');

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
