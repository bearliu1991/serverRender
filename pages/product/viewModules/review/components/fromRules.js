/**
 * @商品评价form表单验证
 */

export const addressRule = {
  Score: [
    {
      required: true,
      message: 'Enter a first name.',
      trigger: 'hover',
    },
  ],
  Title: [
    {
      required: true,
      message: 'Enter a last name.',
      trigger: 'blur',
    },
  ],
  Review: [
    {
      required: true,
      message: 'Enter an address.',
      trigger: 'blur',
    },
  ],
  Name: [
    {
      required: true,
      message: 'Enter a city.',
      // trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please enter an email address.',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'The email you entered is invalid.',
      trigger: 'blur',
    },
  ],
}
