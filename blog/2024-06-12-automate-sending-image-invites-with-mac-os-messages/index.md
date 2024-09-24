---
slug: automate-sending-texts
title: Automate sending images via text with Mac OS Messages
date: 2024-06-12
author: Dustin Davis
description:
  How I sent out images to 80 phone numbers in 12 minutes with Mac OS Messages
categories:
  - automation
  - MacOS
  - cli
  - bash
banner: ./images/banner.jpg
bannerCredit:
  Photo by
  [Firmbee.com](https://unsplash.com/@firmbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  on
  [Unsplash](https://unsplash.com/photos/woman-holding-silver-iphone-6-SpVHcbuKi6E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
---

My wife has been a bit overwhelmed this summer with going back to school and
planning a wedding for our daughter. Last night after doing some yard work we
sat down and she said, "I need your help sending out all these invites." She had
a spreadsheet with 80 phone numbers. I imagined manually copying and pasting
that image into Messages 80 times and it didn't sound appealing, so I said, "Let
me see if I can script it".

It took longer than I had hoped because I struggled getting the image to attach
and display properly and work on both iOS and Android. I don't have an Android
phone to test with, so I was using my Google Voice account to send tests to.
Eventually I got it to work. In the process, I added a lot of debugging
statements and logging so this script may be unnecessarily complex. But it
works!

```shell
#!/bin/zsh

# Path to the file containing phone numbers
PHONE_NUMBERS_FILE="phone_numbers.txt"

# Path to the image to be attached
IMAGE_PATH="invite.jpg"

# Log file
LOG_FILE="send_messages.log"

# Function to log messages to both the screen and the log file
log_message() {
  echo "$1"
  echo "$1" >> "$LOG_FILE"
}

# Start logging
log_message "Script started at $(date)"

# Check if the phone numbers file exists
if [[ ! -f "$PHONE_NUMBERS_FILE" ]]; then
  log_message "Phone numbers file $PHONE_NUMBERS_FILE does not exist."
  exit 1
fi

# Check if the image file exists
if [[ ! -f "$IMAGE_PATH" ]]; then
  log_message "Image file \"$IMAGE_PATH\" does not exist."
  exit 1
fi

# Log the contents of the phone numbers file
log_message "Contents of $PHONE_NUMBERS_FILE:"
cat "$PHONE_NUMBERS_FILE" | while read -r line; do
  log_message "$line"
done

# Read the phone numbers from the file and send the image
while read -r PHONE_NUMBER; do
  if [[ -n "$PHONE_NUMBER" ]]; then
    log_message "Processing phone number: $PHONE_NUMBER"

    # Copy image to clipboard using AppleScript
    osascript <<EOF
      set the clipboard to (read (POSIX file "$(realpath "$IMAGE_PATH")") as JPEG picture)
EOF

    # Send image using GUI scripting
    osascript <<EOF
      tell application "Messages" to activate
      delay 1
      tell application "System Events"
        keystroke "n" using {command down}
        delay 1
        keystroke "$PHONE_NUMBER"
        keystroke return
        delay 1
        repeat 5 times
          keystroke tab
          delay 0.2
        end repeat
        repeat 6 times
          key code 51
          delay 0.2
        end repeat
        keystroke "v" using {command down}
        delay 1
        keystroke return
      end tell
EOF
    log_message "Image sent to $PHONE_NUMBER"
    sleep 3

  else
    log_message "Empty or invalid phone number line encountered"
  fi
done < "$PHONE_NUMBERS_FILE"

log_message "Script ended at $(date)"
```

## Instructions for creating and running the script:

1. Create a new file with a .sh extension (e.g. send_image_invites.sh)
2. Copy the above code into the file
3. Replace `$IMAGE_PATH` with the full path to the image file you want to send
4. Create a file containing the phone numbers you want to send the image to, one
   per line (e.g. phone_numbers.txt)
5. Replace `$PHONE_NUMBERS_FILE` with the full path to the phone numbers file
6. Save the script file
7. Open Terminal and navigate to the directory containing the script file
8. Make the script executable with the command: `chmod +x send_image_invites.sh`
9. Run the script with the command: `./send_image_invites.sh`

The script will log its progress to the console and send the specified image to
each phone number in the phone numbers file using the Messages app on macOS. The
great part about this method was that I could watch it doing all the work.
