export function createWelcomeEmailTemplate(name, clientURL) {
	return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 30px; text-align: center; color: white; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(0,0,0,0.2);">Welcome to ChatMate! 🎉</h1>
            </div>
          </div>
        
          <!-- Content -->
          <div style="padding: 50px 40px; color: #333333; line-height: 1.7;">
            <h2 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 26px; margin-top: 0; font-weight: 700;">Hi ${name},</h2>
            
            <p style="margin: 20px 0; font-size: 17px; color: #555;">We're absolutely <strong>thrilled</strong> to have you join our community! Thank you for signing up and taking the first step on this exciting journey with us.</p>
          
            <!-- Features Box -->
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); padding: 35px 30px; border-radius: 15px; margin: 35px 0; border: 2px solid #e8ebff;">
                <div style="font-size: 20px; font-weight: 700; color: #667eea; margin-bottom: 20px; text-align: center;">🚀 Here's what you can do next:</div>
                
                <div style="margin: 18px 0; padding: 20px; padding-left: 60px; position: relative; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-size: 16px; color: #444;">
                    <span style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);">✓</span>
                    Complete your profile to personalize your experience
                </div>
                
                <div style="margin: 18px 0; padding: 20px; padding-left: 60px; position: relative; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-size: 16px; color: #444;">
                    <span style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);">✓</span>
                    Explore our resources and documentation
                </div>
                
                <div style="margin: 18px 0; padding: 20px; padding-left: 60px; position: relative; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-size: 16px; color: #444;">
                    <span style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);">✓</span>
                    Connect with our thriving community
                </div>
            </div>
            
            <!-- CTA Button -->
            <center>
                <a href=${clientURL} style="display: inline-block; margin: 35px 0; padding: 18px 45px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); text-transform: uppercase; letter-spacing: 1px;">Get Started Now</a>
            </center>
            
            <!-- Divider -->
            <div style="height: 3px; background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent); margin: 40px 0; border-radius: 2px;"></div>
            
            <p style="margin: 20px 0; font-size: 17px; color: #555;">If you have any questions or need assistance, don't hesitate to reach out. Our team is here to help you succeed every step of the way!</p>
            
            <!-- Signature -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e8ebff;">
                <p style="margin: 20px 0; font-size: 17px; color: #555;">Welcome aboard! 🎊<br>
                <strong style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 18px;">The ChatMate Team</strong></p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); color: #666666; font-size: 14px;">
            
            <p style="margin: 10px 0;"><strong>© 2026 ChatMate.</strong> All rights reserved.</p>
            
            <p style="margin-top: 15px;">
                <a href="#" style="color: #667eea; text-decoration: none; font-weight: 600;">Privacy Policy</a> • 
                <a href="#" style="color: #667eea; text-decoration: none; font-weight: 600;">Terms of Service</a> • 
                <a href="#" style="color: #667eea; text-decoration: none; font-weight: 600;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
