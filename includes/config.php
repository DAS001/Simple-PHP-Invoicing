<?php
// Debugging
ini_set('error_reporting', E_ALL);

// DATABASE INFORMATION
define('DATABASE_HOST', getenv('IP'));
define('DATABASE_NAME', 'invoicemgsys');
define('DATABASE_USER', 'phil');
define('DATABASE_PASS', 'phil');

// COMPANY INFORMATION
define('COMPANY_LOGO', 'images/logo.png');
define('COMPANY_LOGO_WIDTH', '300');
define('COMPANY_LOGO_HEIGHT', '90');
define('COMPANY_NAME','Company Ltd');
define('COMPANY_ADDRESS_1','1 High Street,');
define('COMPANY_ADDRESS_2','Lower Hutt');
define('COMPANY_ADDRESS_3','     ');
define('COMPANY_COUNTY','New Zealand');
define('COMPANY_POSTCODE','5200');

define('COMPANY_NUMBER',''); // Company registration number
define('COMPANY_VAT', 'Company GST: 999-999-999'); // Company TAX/VAT number

// EMAIL DETAILS
define('EMAIL_FROM', 'info@example.com'); // Email address invoice emails will be sent from
define('EMAIL_NAME', 'Company Ltd'); // Email from address
define('EMAIL_SUBJECT', 'Invoice default email subject'); // Invoice email subject
define('EMAIL_BODY_INVOICE', 'Invoice default body'); // Invoice email body
define('EMAIL_BODY_QUOTE', 'Quote default body'); // Invoice email body
define('EMAIL_BODY_RECEIPT', 'Receipt default body'); // Invoice email body

// OTHER SETTINFS
define('INVOICE_PREFIX', 'IN'); // Prefix at start of invoice - leave empty '' for no prefix
define('INVOICE_INITIAL_VALUE', '1000'); // Initial invoice order number (start of increment)
define('INVOICE_THEME', '#8B0000'); // Theme colour, this sets a colour theme for the PDF generate invoice
define('TIMEZONE', 'America/Los_Angeles'); // Timezone - See for list of Timezone's http://php.net/manual/en/function.date-default-timezone-set.php
define('DATE_FORMAT', 'DD/MM/YYYY'); // DD/MM/YYYY or MM/DD/YYYY
define('CURRENCY', '$'); // Currency symbol
define('ENABLE_VAT', true); // Enable TAX/VAT/GST
define('VAT_INCLUDED', false); // Is VAT/GST included or excluded?
define('VAT_RATE', '15'); // This is the percentage value of VAT/GST

define('PAYMENT_DETAILS', 'Payments can be made to:<br>Company Ltd<br>Bank Account Number:000<br>GST No. 999-999-999 '); // Payment information
define('FOOTER_NOTE', 'We appreciate your business');

// CONNECT TO THE DATABASE
$mysqli = new mysqli(DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME);

?>