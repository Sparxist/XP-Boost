> [!CAUTION]
> Sparx have now made it so that times tables NO LONGER gives you XP! This puts this project unfortunately on hold for now, and this program will not work for now.

# XP-Boost
Want to gain massive amounts of XP in Sparx Maths? Now you can!

## Installation
- Install the Tampermonkey extension ([Chromium](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)) ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)). 
- Go to the Tampermonkey extension, and click `Create a new script...`
- Copy the text in the `main.js` file above.
- Select all of the existing code and paste the code and hit Ctrl-S/⌘-S to save. The program will run automatically.

## Usage & Tips

To trigger the code, go to Independent Learning -> Times Tables -> 100 Club Check.

Simply do a question to multiply your XP.

I advise you to reload the website 1 times tables question before the end (hotkey: press F5 or Ctrl/Cmd-R), so your 100 Club Check isn't automatically greyed out.

> [!CAUTION]
> What this code does is exploit Sparx's lack of an [idempotency token](https://www.youtube.com/watch?v=IP-rGJKSZ3s). As a result, given the fact that each Times Tables problem only increases XP by 1, the program needs to send A LOT of requests for XP gain, spamming your network and Sparx's servers. As a result, you may get in trouble with Sparx 😀
>
> All code is therefore made for educational purposes only. Using this is at your own risk. See the MIT License for more info on liability.
> If you or Sparx's network can't stand the constant requests, try raising the delay / lowering the requests.

> [!NOTE]
> You may see that your XP gain in the leaderboard section is significantly higher than your real XP gain. This is a known issue that probably can't be solved, as it requires the servers to work perfectly.
