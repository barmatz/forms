<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode(array(
	'form'=>array(
		'loading'=>'loading...',
		'submit'=>array(
			'label'=>'Submit',
			'success'=>'Your forms has been submitted',
			'error'=>'An error has occured! Click to try again'
		),
		'field'=>array(
			'errors'=>array(
				'emptyValue'=>'value is empty',
				'invalidValue'=>'invalid value',
				'invalidEmail'=>'invalid email address',
				'invalidPhone'=>'invalid phone number',
				'minimumLength'=>'value must be ${1} characters minimum',
				'maximumLength'=>'value must be ${1} characters maximum',
				'exactLength'=>'value must be exactly ${1} characters',
				'greaterThan'=>'value must be greater than ${1}',
				'lesserThan'=>'value must be lesser than ${1}',
				'digitsOnly'=>'only digits are allowed',
				'noDigits'=>'cannot contain digits'
			)
		)
	)
));