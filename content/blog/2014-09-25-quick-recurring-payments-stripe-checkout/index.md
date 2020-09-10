---
author: Dustin Davis
comments: true
date: 2014-09-25T22:25:58.000Z
link: https://dustindavis.me/quick-recurring-payments-stripe-checkout/
slug: quick-recurring-payments-stripe-checkout
title: Quick Recurring Payments with Stripe & Checkout
banner: ./images/banner.jpg
bannerCredit:
  Photo by [rupixen.com](https://unsplash.com/@rupixen) on
  [Unsplash](https://unsplash.com)
categories:
  - PHP
description: How to quickly set up a recurring payment page with PHP and Stripe
---

My mom called me last night. She owns a
[hot tub dealership in the Salt Lake City area](http://soakers.biz). She said
she had a woman come in and purchase a top of the line hot tub the other day.
The woman said, "I'm glad I found you. You were not on Google when I searched.
Someone up the street said I should check out your store."

My mom has been paying some company \$320 per month for the last nine months
that promised to get her on the first page of Google. They have literally done
nothing except continue to bill her month after month.

I don't know how effective an SEO campaign would be if you are only paying \$320
per month, but I know I could take half that and start getting lots more
exposure than she is getting just by using Google Adwords.

Basically my mom was calling to ask if she could send that money to me instead
in return for me helping her get more traffic. I agreed to do it. I have enough
experience that I put together a simple marketing plan for her so I can start to
get her more customers and as I prove I can get a lot better ROI, then we can
increase our marketing spending and efforts, and I can hire a virtual assistant
to do the majority of the work.

But this post isn't really about marketing, SEO, or hiring VAs. My first order
of business was to figure out how to allow my mom to set up an auto-payment plan
on her business credit card to put that \$320 into my account each month.

Without doing much research I turned to stripe, because I know I could get it
set up fairly quickly with their API. And it was relatively quick. It took me
about 2 hours to do the research and create the page. It is nothing fancy.

First I created a folder on my server named payments and dropped the lib folder
of the [PHP Stripe API library](https://stripe.com/docs/libraries#php-library)
into it.

I created a config.php file with the following:

```php
<?php
require_once('./lib/Stripe.php');

$stripe = array(
  "secret_key"      => "**my_secret_key**",
  "publishable_key" => "**my_publishable_key**"
);

Stripe::setApiKey($stripe['secret_key']);
?>
```

I created a subscription plan on the Stripe admin page and gave it an ID of
"soakers320". Then I created this very simple index.php page:

```php
<?php
if($_SERVER["HTTPS"] != "on")
{
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once(dirname(**FILE**) . '/config.php');

    $token  = $_POST['stripeToken'];
    $customer = Stripe_Customer::create(array(
        'email' =&gt; 'customer@example.com',
        'card'  =&gt; $token,
        'plan'  =&gt; 'soakers320'
    ));

    echo '<h1>Successfully charged $320.00. Thank you!</h1>';
    exit;
}

?><html>
<head>
<title>Red Seam Marketing Subscription</title>
</head>
<body>

<?php if ($_SERVER['REQUEST_METHOD'] == 'GET'): ?>

<script src="https://checkout.stripe.com/v2/checkout.js"></script>
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<form method="post">
  </form>

<script>
    $(document).ready(function(){
      var token = function(res){
        var $input = $('<input type=hidden name=stripeToken />').val(res.id);
        $('form').append($input).submit();
      };

    StripeCheckout.open({
        key:         '**my_publishable_key**',
        address:     true,
        currency:    'usd',
        name:        'Marketing',
        description: 'Marketing Plan for Soakers.biz',
        panelLabel:  'Subscribe',
        token:       token,
        allowRememberMe: false
      });

      return false;
    });
</script>
<?php endif; ?>

</body>
</html>
```

Some notes on the code:

Lines 3-7: I should also mention I purchased a `$9.00` SSL certificate at
[namecheap.com](http://namecheap.com) for added security. This code ensures that
the page is only accessed via https.

Lines 9-22: After the form is filled out and submitted, it creates a form past
back to this page. This is the call that creates the customer using the
subscription plan and actually charges their card.

Lines 41-59: This creates the [Checkout](https://stripe.com/checkout) form that
generates the card token that is passed into this page when it is posted.

That's about it! Let me know if you have questions on any other portions of this
code.
