// regex taken from https://www.w3resource.com/javascript/form/email-validation.php
export function validateEmail(mail) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return (true)
    } else {
      return (false)
    }
}