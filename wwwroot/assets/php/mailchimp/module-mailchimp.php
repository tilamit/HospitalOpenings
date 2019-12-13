<?php
/*
 ______ _____   _______ _______ _______ _______ ______ _______ 
|   __ \     |_|    ___|_     _|   |   |       |   __ \   _   |
|    __/       |    ___| |   | |       |   -   |      <       |
|___|  |_______|_______| |___| |___|___|_______|___|__|___|___|

P L E T H O R A T H E M E S . C O M               (c) 2014-2015

File Description: MailChimp API
Based on: https://github.com/drewm/mailchimp-api, by Drew McLellan 
Version: 1.0.1

*/


if ( ! defined( 'ABSPATH' ) ) exit; // NO DIRECT ACCESS 

if ( !class_exists('Plethora_Module_MailChimp') ) {

  /**
   * Super-simple, minimum abstraction MailChimp API v2 wrapper
   * 
   * Uses curl if available, falls back to file_get_contents and HTTP stream.
   * This probably has more comments than code.
   *
   * Contributors:
   * Michael Minor <me@pixelbacon.com>
   * Lorna Jane Mitchell, github.com/lornajane
   * 
   * @author Drew McLellan <drew.mclellan@gmail.com> 
   * @version 1.1.1
   */
  class Plethora_Module_MailChimp
  {
      private $api_key;
      private $api_endpoint = 'https://<dc>.api.mailchimp.com/2.0';
      private $verify_ssl   = false;

      /**
       * Create a new instance
       * @param string $api_key Your MailChimp API key
       */
      function __construct( $api_key = '' )
      {
          if ( $api_key === '' ){
            return null; 
          }
          $this->api_key = $api_key;
          list(, $datacentre) = explode('-', $this->api_key);
          $this->api_endpoint = str_replace('<dc>', $datacentre, $this->api_endpoint);
      }

      /**
       * Call an API method. Every request needs the API key, so that is added automatically -- you don't need to pass it in.
       * @param  string $method The API method to call, e.g. 'lists/list'
       * @param  array  $args   An array of arguments to pass to the method. Will be json-encoded for you.
       * @return array          Associative array of json decoded API response.
       */
      public function call($method, $args=array(), $timeout = 10)
      {
        if ( function_exists( "wp_remote_post" ) ){  
          return $this->wpMakeRequest( $method, $args, $timeout );  
        } else {  
          return $this->makeRequest( $method, $args, $timeout );  
        }
      }

      /**
       * Performs the underlying HTTP request using Wordpress wp_remote_post(). Quite exciting
       * @param  string $method The API method to be called
       * @param  array  $args   Assoc array of parameters to be passed
       * @return array          Assoc array of decoded result
       */
      private function wpMakeRequest($method, $args=array(), $timeout = 10)
      {      
          $args['apikey'] = $this->api_key;
          $url = $this->api_endpoint.'/'.$method.'.json';
          $result = wp_remote_post( $url, array(
            'method'      => 'POST',
            'timeout'     => 45,
            'user-agent'  => "PHP-MCAPI/2.0",
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking'    => true,
            'headers'     => array(
              'Content-Type'   => 'application/json',
              'Connection'     => 'close',
              ),
            'body'        => json_encode($args)
              )
          );

          if ( is_wp_error( $result ) ) {
             // $error_message = $result->get_error_message();
             $result = false;
          }
          return $result ? json_decode($result['body'], true) : false;
      }

      /**
       * Performs the underlying HTTP request. Not very exciting
       * @param  string $method The API method to be called
       * @param  array  $args   Assoc array of parameters to be passed
       * @return array          Assoc array of decoded result
       */
      private function makeRequest($method, $args=array(), $timeout = 10)
      {      
          $args['apikey'] = $this->api_key;

          $url = $this->api_endpoint.'/'.$method.'.json';
          $json_data = json_encode($args);

          if (function_exists('curl_init') && function_exists('curl_setopt')){
              $ch = curl_init();
              curl_setopt($ch, CURLOPT_URL, $url);
              curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
              curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');       
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
              curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
              curl_setopt($ch, CURLOPT_POST, true);
              curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $this->verify_ssl);
              curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
              $result = curl_exec($ch);
              curl_close($ch);
          } else {
              $result    = file_get_contents($url, null, stream_context_create(array(
                  'http' => array(
                      'protocol_version' => 1.1,
                      'user_agent'       => 'PHP-MCAPI/2.0',
                      'method'           => 'POST',
                      'header'           => "Content-type: application/json\r\n".
                                            "Connection: close\r\n" .
                                            "Content-length: " . strlen($json_data) . "\r\n",
                      'content'          => $json_data,
                  ),
              )));
          }

          return $result ? json_decode($result, true) : false;
      }

  }

} // << Plethora_Module_MailChimp Class

