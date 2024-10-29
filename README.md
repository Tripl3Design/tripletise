# TripleTise CPQ Configurator Integration

## What is the TripleTise Configurator?
The **TripleTise configurator** is a custom-built real-time 3D WebGL tool that allows for countless product variations based on CPQ (Configure Price Quote). Easily link the configurator to your webshop, enabling your customers to explore all the available options and proceed to purchase.

With the TripleTise configurator, customers can zoom, rotate, and view products in high quality on desktop, tablet, and mobile devices. They can experiment with all available variants, colors, and materials in a seamless experience.

**CPQ software** (Configure, Price, Quote) helps businesses sell complex products and services more easily. It automates the process of configuring products, generating accurate prices, and creating quotes, leading to a more efficient sales process and precise offers.
By using CPQ software, you enhance the customer experience, increase quote accuracy, and save valuable time in the sales process. It's ideal for businesses in industries such as manufacturing, technology, and services where customization and complex pricing structures play a significant role.

## Installation
With this integration, you can easily add the **TripleTise CPQ configurator** to your website and adjust the configuration based on your preferences and region. Follow the instructions below to integrate and customize the system according to your needs.

1. **Ensure your domain is registered.**
   The configurator can only be added if the domain of the website where it is implemented has been registered in the configurator settings. Please make sure that your domain is added to the allowed list in the TripleTise settings before proceeding. If you’re unsure or need assistance, visit [tripledesign.nl](https://tripledesign.nl) to get help.
3. **Add the configurator to your website.**
   Insert the script tag below into the page where you want the configurator to appear. Place it just before the closing `</body>`-tag.

    ```html
    <script src="https://cdn.jsdelivr.net/gh/Tripl3Design/tripletise@latest/tripletiseModal.js"></script>
    ```

4. **Add the configurator link.**
   Use the `tripletiseModal()` function to call the configurator. The function accepts parameters that can be customized according to your preferences. The link should be added to the page where the configurator needs to be activated, for example on a button or image.
   When implementing the configurator, you can use various parameters to adjust the behavior and content. These parameters are added after `brandname-productname.web.app`, preceded by a question mark (`?`), and joined by an ampersand (`&`).
  
     ```javascript
    tripletiseModal('brandname-productname.web.app?id=2&lang=en&region=nl&prices');
    ```
    Below are some example parameters. These are not always available in every configurator. For additional configuration parameters, visit [tripledesign.nl](https://tripledesign.nl).

    | Parameter       | Description                                                                   | Values                         |
    |-----------------|-------------------------------------------------------------------------------|--------------------------------|
    | `id`            | The preset image used as the starting point.                                  | A number (e.g., `1`, `2`)      |
    | `lang`          | The language in which the configurator is displayed.                          | e.g., `nl` (Dutch) or `en` (English) |
    | `region`        | The region for which the configurator is set, for correct price display.      | e.g., `nl`, `de`, `fr`         |
    | `prices`        | Specifies whether to display prices.                                          | No value (shows prices)        |

    **Notes**
    - **Parameter order:** the order in which you place the parameters does not matter. As long as they are separated by an `&`, they will work correctly.
    - **Default settings:** some parameters are enabled or disabled by default for mobile devices.
  
5. **Congratulations!** You’ve successfully integrated the TripleTise CPQ configurator into your website. Your users can now enjoy a seamless configuration experience tailored to your brand and region. Feel free to further customize the parameters as needed.
   You can even add multiple versions of the same configurator with different settings on various parts of your website. If you have any questions, we're always here to help. You've taken a great step toward improving your website's user experience!

   **Important Warning**
Please note: Following this integration guide carefully is essential for the successful implementation of the TripleTise CPQ configurator on your website. If these instructions are not adhered to, any resulting errors, bugs, or issues that may arise will not be the responsibility of TripleDesign. We recommend that you thoroughly test the configurator after implementation to ensure it functions as expected. For assistance or if you encounter any problems, please reach out to our support team.
