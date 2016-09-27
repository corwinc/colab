# Revolutionary-Eels

AWS Workflow: 

1. Set up Elastic Beanstalk environment with no special configurations -- i.e., don't tie in an RDS nor a VPC. 

2. Deploy an RDS instance of a MySQL DB (this can be done in any order. It is not attached to the Elastic Beanstalk environment.)

3. Go to the Software config option in the Elastic Beanstalk console to set the RDS endpoint as an environment variable CONNECTION_STRING. Use this to connect the server to the DB using process.env.CONNECTION_STRING

4. Use CodePipe to connect the Github repo's deploy branch to the Elastic Beanstalk. 

5. Go to the EC2 Service to see the instance of your app that the CodePipe Service has spun up. Look at the EC2 instance details. Grab its private IP. 

6. Go to the RDS Service, to the instance you deployed in Step 2, look at the instance details, click on its security group, and add a rule. Use the IP from Step 5 followed by /32.

7. Go to the Elastic Beanstalk Console. Click the public url at the top of the console. This should take you to your app! 

7a. If you have errors: Go to the Beanstalk Console, click Logs, and request logs. The last 100 lines should be fine. Download them; they'll appear in a browser, showing you why your server crashed. 
