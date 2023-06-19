Information for admin panel
#Amount spend on marketting
#total product 
#All merchant 
#total sales
#sales per product
#Area of sales
#Most product per area
#Most product per merchant
#average ticket value
#merchant sales report
#Customer analytics (e.g. demographics, purchase history)
#Order status tracking (e.g. pending, shipped, delivered)
#Inventory management (e.g. stock levels, reordering alerts)
#Payment and transaction history
#Customer support tickets and inquiries
#Abandoned cart tracking and recovery options
#Website traffic and conversion rates
#Popular search queries and keywords
#Product review and rating management
#Marketing campaign performance tracking
#Employee management (e.g. access levels, tasks, performance metrics)
#VAT and tax management
#Social media integration and performance metrics

make a map and on that mark from where order is placed with a dot so we can zoom on the map to see where the sales is happening
#for merchant his total sales will be represented and for he admin all the data will be shown

VISULIZATION
Total Product: Use a bar chart to show the total number of products in your inventory.

All Merchant: Use a pie chart to show the distribution of merchants on your platform.

Total Sales: Use a line chart to show the trend of total sales over time.

Sales per Product: Use a bar chart to compare the sales volume of different products.

Area of Sales: Use a heat map to show the concentration of sales in different geographic regions.

Most Product per Area: Use a bubble chart to show the top-selling products in different regions.

Most Product per Merchant: Use a bar chart to show the top-selling products for each merchant on your platform.

Average Ticket Value: Use a line chart to show the trend of the average order value over time.

Merchant Sales Report: Use a scatter plot to show the relationship between a merchant's sales volume and profit margin.


DASHBOARD LINKS https://www.behance.net/gallery/156753011/AtlasX-Sales-Dashboard


//things to do
address module 
merchant onboarding form page
login singnup jwt and also protected route
database management i.e. schema design
payment gateway
admin panel according to the merchant 
sms + email + seller 
seller will have different module and also delivery as microservice which will have delivery order id will contain map 
can select nearest store
//reference https://standardstore.in/



Merchant onboarding
Form should be there to onboard: 
Table  of merchant :-

#most dedtails will be fetched by the GSTIN api 
make seperate frontend for merchant and admin..
login will be same just the role will be different
//it will be called merchant login

API for gst verification -- http://sheet.gstincheck.co.in/check/2bc3f12374405f9973a9bdfb246b2992/20BTSPA0601F2ZH

Name 
shopName
GSTno
AAdhar
mobileNo
email id
address it will have pin code
location

once onboarded they can add items and we can approve..or in starting we will take manually and upload them..
we need some kinda approval process...so that if any one is adding wrong item or something like this then admin has right to reject....
and once approved by admin only those are visible to customer.....

after login Merchant dashboard :
dashboard with all details about orders,sales etc
order history
pending payments
all transactions done till now
total earnings made so far
orders placed today

In admin dashboard the above features + 
merchant management panel where you can see pending approvals/rejected requests.
you should be able to view total number of users registered as well as active ones.
view user profile info such as name email address mobile no location shopname gstin adhaar card photograph etc
add new merchant request from here also edit existing data.
approve /reject these requests.

top rated merchants based upon their rating given by customers
most viewed product list (based uppon views)
recently added products(new arrivals )
bestselling products
trending products


#For Marketting and sales

hot deals
featured offers
coupon codes for discounts
loyalty points system
referral programme
refer a friend option
wallet balance section
cashback options
gift cards


#for convienence

customer support chatbot
contact us form
about page
terms & conditions
privacy policy
return policies
refund polices
shipping charges
payment methods accepted
delivery timelines
cancellation/ refund policie
disclaimer
FAQ's
feedback forms
social media links
blog link
newsletter subscription box


//next add delete from cart functionality it will delete from the cart for login and non login user
//when user stops at a page then it should be captured to send notification and email