<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode(array(
	"form"=>array(
		"loading"=>"טוען...",
		"submit"=>array(
			"label"=>"שלח",
			"success"=>"הטופס נשלח בהצלחה",
			"error"=>"שגיאה בשליחה! נסה שנית"
		),
		"field"=>array(
			"errors"=>array(
				"emptyValue"=>"השדה ריק",
				"invalidValue"=>"ערך לא נכון",
				"invalidEmail"=>"כתובת דוא&quot;ל לא נכונה",
				"invalidPhone"=>"מספר טלפון לא תקין",
				"minimumLength"=>"הערך חייב להיות מינימום ${1} תווים",
				"maximumLength"=>"הערך חיים להיות מקסימום ${1} תווים",
				"exactLength"=>"הערך חיים להיות בדיוק ${1} תווים",
				"greaterThan"=>"הערך חייב להיות גדול מ-${1}",
				"lesserThan"=>"הערך חייב להיות קטן מ-${1}",
				"digitsOnly"=>"הערך יכול להכיל רק מספרים",
				"noDigits"=>"ערך אינו יכול להכיל מספרים"
			)
		)
	)
));