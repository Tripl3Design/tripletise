# TripleTise CPQ Configurator Integration

With this integration, you can easily add the **Tripletise CPQ configurator** to your website and adjust the configuration based on your preferences and region. Follow the instructions below to integrate and customize the system according to your needs.

## Installation

1. **Ensure your domain is registered.**
   The configurator can only be added if the domain of the website where it is implemented has been registered in the configurator settings. Please make sure that your domain is added to the allowed list in the Tripletise settings before proceeding. If you’re unsure or need assistance, visit tripledesign.nl to get help with domain registration.
3. **Add the configurator to your website.**
   Insert the script tag below into the page where you want the configurator to appear. Place it just before the closing `</body>`-tag.

    ```html
    <script src="https://cdn.jsdelivr.net/gh/Tripl3Design/tripletise@latest/tripletiseModal.js"></script>
    ```

4. **Add the configurator link.**
   Use the `tripletiseModal()` function to call the configurator. The function accepts parameters that can be customized according to your preferences. The link should be added to the page where the configurator needs to be activated, for example on a button or image.
   When implementing the configurator, you can use various parameters to adjust the behavior and content. These parameters are added after `brandname.productname.web.app`, preceded by a question mark (`?`), and joined by an ampersand (`&`).
  
     ```javascript
    tripletiseModal('merknaam.productnaam.web.app?id=2&lang=en&region=nl&prices');
    ```
    Below are some common parameters. For additional configuration parameters, visit [tripledesign.nl](https://tripledesign.nl).

    | Parameter       | Description                                                                   | Values                         |
    |-----------------|-------------------------------------------------------------------------------|--------------------------------|
    | `id`            | The preset image used as the starting point.                                  | A number (e.g., `1`, `2`)      |
    | `lang`          | The language in which the configurator is displayed.                          | `nl` (Dutch) or `en` (English) |
    | `region`        | The region for which the configurator is set, for correct price display.      | e.g., `nl`, `de`, `fr`         |
    | `prices`        | Specifies whether to display prices.                                          | No value (shows prices)        |

    **Notes**
    - **Parameter order:** the order in which you place the parameters does not matter. As long as they are separated by an `&`, they will work correctly.
    - **Default settings:** some parameters are enabled or disabled by default for mobile devices.
  
5. **Congratulations!** You’ve successfully integrated the Tripletise CPQ configurator into your website. Your users can now enjoy a seamless configuration experience tailored to your brand and region. Feel free to further customize the parameters as needed.
   You can even add multiple versions of the same configurator with different settings on various parts of your website. If you have any questions, we're always here to help. You've taken a great step toward improving your website's user experience!
