 (function (window, document) {
    "use strict";

    var currentScript = document.currentScript;
    var assetBase = "";

    function resolveAssetBase() {
        var fallbackScript;

        if (currentScript && currentScript.src) {
            return currentScript.src.replace(/\/[^/]+$/, "");
        }

        fallbackScript = document.querySelector('script[src$="custom.js"]');
        return fallbackScript && fallbackScript.src ? fallbackScript.src.replace(/\/[^/]+$/, "") : "";
    }

    function injectStylesheet(id, href) {
        return new Promise(function (resolve, reject) {
            var existing = document.getElementById(id);
            var link;

            if (existing) {
                resolve(existing);
                return;
            }

            link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.href = href;
            link.onload = function () {
                resolve(link);
            };
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    function injectScript(id, src) {
        return new Promise(function (resolve, reject) {
            var existing = document.getElementById(id);
            var script;

            if (window.WebformPlugin) {
                resolve(window.WebformPlugin);
                return;
            }

            if (existing) {
                existing.addEventListener("load", function () {
                    resolve(window.WebformPlugin);
                }, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
            }

            script = document.createElement("script");
            script.id = id;
            script.src = src;
            script.async = true;
            script.onload = function () {
                resolve(window.WebformPlugin);
            };
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Server-side CAPTCHA configuration
    var EDGE_FUNCTION_URL = "https://nentrwodmkcnzafespvk.supabase.co/functions/v1/verify-captcha";
    var S_KEY = "sb_publishable_H7AdWIjdPbdy__pKYLDp6w_JS6AQUWX";

    function loadSecurityChallenge(context) {
        // Fetch CAPTCHA question and token from server
        return fetch(EDGE_FUNCTION_URL + "?get_question=true", {
            headers: { 'apikey': S_KEY }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to load captcha');
            }
            return response.json();
        })
        .then(function(data) {
            return {
                prompt: data.question || "Loading...",
                expectedAnswer: "", // Server will validate
                token: data.token || ""
            };
        })
        .catch(function(error) {
            window.console.error("Captcha load error:", error);
            // // Fallback to client-side if server fails
            // var first = Math.floor(Math.random() * 10) + 1;
            // var second = Math.floor(Math.random() * 10) + 1;
            // return {
            //     prompt: "What is " + first + " + " + second + "?",
            //     expectedAnswer: String(first + second),
            //     token: "fallback-" + Date.now()
            // };
        });
    }

    function initPlugin() {
        var mountNode = document.getElementById("webform_inr");

        if (!mountNode || mountNode.dataset.gwfInitialized === "true" || !window.WebformPlugin) {
            return;
        }

        mountNode.dataset.gwfInitialized = "true";

        new window.WebformPlugin({
            formId: "webform_inr",
            subject: "Get In Touch",
            submitLabel: "Send Message",
            loadingLabel: "Processing...",
            successMessage: "Success! Form payload is ready for your API flow.",
            errorMessage: "Unable to submit. Please try again.",
            resetOnSuccess: true,
            autoDetectCountry: false,
            defaultCountryCode: "IN",
            fields: [
                {
                    type: "text",
                    name: "full_name",
                    label: "Your Full Name",
                    placeholder: "Enter your full name",
                    required: true,
                    minLength: 2,
                    pattern: /^[a-zA-Z\s.',-]+$/,
                    error: "Please enter a valid name (letters only).",
                    width: "full"
                },
                {
                    type: "email",
                    name: "email",
                    label: "Work Email Address",
                    placeholder: "Enter your work email address",
                    required: true,
                    width: "full"
                },
                {
                    type: "phone",
                    name: "phone",
                    label: "Phone Number",
                    placeholder: "Enter your phone number",
                    required: true,
                    digitsOnly: true,
                    minDigits: 7,
                    maxDigits: 15,
                    width: "full"
                },
                // {
                //     type: "radio",
                //     name: "preferred_contact",
                //     label: "Preferred Contact Method",
                //     required: true,
                //     width: "half",
                //     options: [
                //         { label: "Email", value: "email" },
                //         { label: "Phone", value: "phone" },
                //         { label: "WhatsApp", value: "whatsapp" }
                //     ]
                // },
                // {
                //     type: "multiselect",
                //     name: "interested_modules",
                //     label: "Interested Modules",
                //     required: true,
                //     width: "half",
                //     options: [
                //         { label: "CRM", value: "crm" },
                //         { label: "Support", value: "support" },
                //         { label: "Analytics", value: "analytics" },
                //         { label: "Billing", value: "billing" },
                //         { label: "Integrations", value: "integrations" }
                //     ]
                // },
                // {
                //     type: "number",
                //     name: "team_size",
                //     required: true,
                //     min: 1,
                //     max: 100000,
                //     width: "half"
                // },
                // {
                //     type: "url",
                //     name: "website",
                //     width: "half"
                // },
                // {
                //     type: "date",
                //     name: "start_date",
                //     width: "half"
                // },
                // {
                //     type: "file",
                //     name: "supporting_documents",
                //     label: "Supporting Documents",
                //     fileText: "Upload documents",
                //     actionText: "Browse",
                //     accept: ["pdf", "doc", "docx"],
                //     maxSizeMB: 10,
                //     multiple: true,
                //     width: "half"
                // },
                // {
                //     type: "file",
                //     name: "reference_images",
                //     label: "Reference Images",
                //     fileText: "Upload images",
                //     actionText: "Select",
                //     accept: ["png", "jpg", "jpeg", "webp"],
                //     maxSizeMB: 5,
                //     multiple: true,
                //     width: "half"
                // },
                // {
                //     type: "file",
                //     name: "custom_upload",
                //     label: "Custom Upload",
                //     fileText: "Upload custom file",
                //     actionText: "Choose",
                //     accept: ["csv", "xls", "xlsx", "zip"],
                //     maxSizeMB: 12,
                //     multiple: false,
                //     width: "half"
                // },
                {
                    type: "textarea",
                    name: "message",
                    label: "How can we help you?",
                    placeholder: "Describe your project, question, or need...",
                    required: true,
                    rows: 6,
                    width: "full"
                },
                // {
                //     type: "checkbox",
                //     name: "contact_permission",
                //     label: "I agree to share these details and receive a response for this request.",
                //     messageName: "contact_permission_message",
                //     messageValue: "I agree to share these details and receive a response for this request.",
                //     required: true
                // },
                {
                    type: "captcha",
                    name: "Security Check:",
                    hideLabel: false,
                    label: "",
                    questionPrefix: " ",
                    placeholder: "Enter the result",
                    refreshLabel: "↻",
                    loadChallenge: loadSecurityChallenge,
                    required: true,
                    width: "full"
                }
            ],
            onSubmit: function (submission) {
                // Extract form data
                var payload = submission.payload;
                var name = payload.full_name || "";
                var email = payload.email || "";
                var message = payload.message || "";
                var phone = payload.phone || "";
                var captchaAnswer = payload["Security Check:"] || "";
                var captchaToken = payload["Security Check:_token"] || "";

                // Prepare submission data for Edge Function
                var submissionData = {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    userAns: captchaAnswer,
                    token: captchaToken
                };

                // Submit to Edge Function
                return fetch(EDGE_FUNCTION_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'apikey': S_KEY,
                        'Authorization': 'Bearer ' + S_KEY
                    },
                    body: JSON.stringify(submissionData)
                })
                .then(function(response) {
                    // Parse response
                    return response.json().then(function(result) {
                        return {
                            ok: response.ok,
                            result: result,
                            status: response.status
                        };
                    });
                })
                .then(function(data) {
                    if (data.ok) {
                        // Success case
                        return {
                            ok: true,
                            message: data.result.message || "Success! Your message has been sent and saved to our database."
                        };
                    } else {
                        // Error case
                        throw new Error(data.result.error || "Verification failed! Please try again.");
                    }
                })
                .catch(function(error) {
                    window.console.error("Submission error:", error);
                    return {
                        ok: false,
                        message: error.message || "Network error! Please check your connection and try again."
                    };
                });
            }
        });
    }

    function bootstrap() {
        assetBase = resolveAssetBase();

        injectStylesheet("gwf-font-manrope", "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap")
            .then(function () {
                return injectStylesheet("gwf-plugin-css", assetBase.replace("/js", "") + "/css/webform.css");
            })
            .then(function () {
                return injectScript("gwf-plugin-js", assetBase + "/webform.js");
            })
            .then(function () {
                initPlugin();
            })
            .catch(function (error) {
                window.console.error("Webform plugin assets failed to load.", error);
            });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
    } else {
        bootstrap();
    }
})(window, document);

// --- Simple Modal Control (WebformPlugin handles the form) ---
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('getInTouchBtn');
    const closeBtn = document.getElementById('closeModal');

    if (openBtn) {
        openBtn.onclick = function(e) {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Close modal when clicking outside
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Country Code Selector for Phone Field
    function initCountrySelector() {
        // Wait for webform to load
        setTimeout(function() {
            var phoneMeta = document.querySelector('.gwf__phone-meta');
            if (!phoneMeta) return;

            // Get countries data from webform plugin
            var countries = [
                {name: "Afghanistan", code: "AF", dial: "93"},
                {name: "Albania", code: "AL", dial: "355"},
                {name: "Algeria", code: "DZ", dial: "213"},
                {name: "American Samoa", code: "AS", dial: "1"},
                {name: "Andorra", code: "AD", dial: "376"},
                {name: "Angola", code: "AO", dial: "244"},
                {name: "Argentina", code: "AR", dial: "54"},
                {name: "Armenia", code: "AM", dial: "374"},
                {name: "Australia", code: "AU", dial: "61"},
                {name: "Austria", code: "AT", dial: "43"},
                {name: "Azerbaijan", code: "AZ", dial: "994"},
                {name: "Bahamas", code: "BS", dial: "1"},
                {name: "Bahrain", code: "BH", dial: "973"},
                {name: "Bangladesh", code: "BD", dial: "880"},
                {name: "Belarus", code: "BY", dial: "375"},
                {name: "Belgium", code: "BE", dial: "32"},
                {name: "Belize", code: "BZ", dial: "501"},
                {name: "Benin", code: "BJ", dial: "229"},
                {name: "Bhutan", code: "BT", dial: "975"},
                {name: "Bolivia", code: "BO", dial: "591"},
                {name: "Bosnia and Herzegovina", code: "BA", dial: "387"},
                {name: "Botswana", code: "BW", dial: "267"},
                {name: "Brazil", code: "BR", dial: "55"},
                {name: "Brunei", code: "BN", dial: "673"},
                {name: "Bulgaria", code: "BG", dial: "359"},
                {name: "Cambodia", code: "KH", dial: "855"},
                {name: "Cameroon", code: "CM", dial: "237"},
                {name: "Canada", code: "CA", dial: "1"},
                {name: "Chile", code: "CL", dial: "56"},
                {name: "China", code: "CN", dial: "86"},
                {name: "Colombia", code: "CO", dial: "57"},
                {name: "Costa Rica", code: "CR", dial: "506"},
                {name: "Croatia", code: "HR", dial: "385"},
                {name: "Cuba", code: "CU", dial: "53"},
                {name: "Cyprus", code: "CY", dial: "357"},
                {name: "Czech Republic", code: "CZ", dial: "420"},
                {name: "Denmark", code: "DK", dial: "45"},
                {name: "Egypt", code: "EG", dial: "20"},
                {name: "Estonia", code: "EE", dial: "372"},
                {name: "Ethiopia", code: "ET", dial: "251"},
                {name: "Finland", code: "FI", dial: "358"},
                {name: "France", code: "FR", dial: "33"},
                {name: "Georgia", code: "GE", dial: "995"},
                {name: "Germany", code: "DE", dial: "49"},
                {name: "Ghana", code: "GH", dial: "233"},
                {name: "Greece", code: "GR", dial: "30"},
                {name: "Hong Kong", code: "HK", dial: "852"},
                {name: "Hungary", code: "HU", dial: "36"},
                {name: "Iceland", code: "IS", dial: "354"},
                {name: "India", code: "IN", dial: "91"},
                {name: "Indonesia", code: "ID", dial: "62"},
                {name: "Iran", code: "IR", dial: "98"},
                {name: "Iraq", code: "IQ", dial: "964"},
                {name: "Ireland", code: "IE", dial: "353"},
                {name: "Israel", code: "IL", dial: "972"},
                {name: "Italy", code: "IT", dial: "39"},
                {name: "Jamaica", code: "JM", dial: "1"},
                {name: "Japan", code: "JP", dial: "81"},
                {name: "Jordan", code: "JO", dial: "962"},
                {name: "Kazakhstan", code: "KZ", dial: "7"},
                {name: "Kenya", code: "KE", dial: "254"},
                {name: "Kuwait", code: "KW", dial: "965"},
                {name: "Latvia", code: "LV", dial: "371"},
                {name: "Lebanon", code: "LB", dial: "961"},
                {name: "Libya", code: "LY", dial: "218"},
                {name: "Lithuania", code: "LT", dial: "370"},
                {name: "Luxembourg", code: "LU", dial: "352"},
                {name: "Malaysia", code: "MY", dial: "60"},
                {name: "Maldives", code: "MV", dial: "960"},
                {name: "Malta", code: "MT", dial: "356"},
                {name: "Mexico", code: "MX", dial: "52"},
                {name: "Morocco", code: "MA", dial: "212"},
                {name: "Myanmar", code: "MM", dial: "95"},
                {name: "Nepal", code: "NP", dial: "977"},
                {name: "Netherlands", code: "NL", dial: "31"},
                {name: "New Zealand", code: "NZ", dial: "64"},
                {name: "Nigeria", code: "NG", dial: "234"},
                {name: "Norway", code: "NO", dial: "47"},
                {name: "Oman", code: "OM", dial: "968"},
                {name: "Pakistan", code: "PK", dial: "92"},
                {name: "Palestine", code: "PS", dial: "970"},
                {name: "Panama", code: "PA", dial: "507"},
                {name: "Peru", code: "PE", dial: "51"},
                {name: "Philippines", code: "PH", dial: "63"},
                {name: "Poland", code: "PL", dial: "48"},
                {name: "Portugal", code: "PT", dial: "351"},
                {name: "Qatar", code: "QA", dial: "974"},
                {name: "Romania", code: "RO", dial: "40"},
                {name: "Russia", code: "RU", dial: "7"},
                {name: "Saudi Arabia", code: "SA", dial: "966"},
                {name: "Serbia", code: "RS", dial: "381"},
                {name: "Singapore", code: "SG", dial: "65"},
                {name: "Slovakia", code: "SK", dial: "421"},
                {name: "Slovenia", code: "SI", dial: "386"},
                {name: "South Africa", code: "ZA", dial: "27"},
                {name: "South Korea", code: "KR", dial: "82"},
                {name: "Spain", code: "ES", dial: "34"},
                {name: "Sri Lanka", code: "LK", dial: "94"},
                {name: "Sweden", code: "SE", dial: "46"},
                {name: "Switzerland", code: "CH", dial: "41"},
                {name: "Syria", code: "SY", dial: "963"},
                {name: "Taiwan", code: "TW", dial: "886"},
                {name: "Thailand", code: "TH", dial: "66"},
                {name: "Turkey", code: "TR", dial: "90"},
                {name: "Ukraine", code: "UA", dial: "380"},
                {name: "United Arab Emirates", code: "AE", dial: "971"},
                {name: "United Kingdom", code: "GB", dial: "44"},
                {name: "United States", code: "US", dial: "1"},
                {name: "Uruguay", code: "UY", dial: "598"},
                {name: "Uzbekistan", code: "UZ", dial: "998"},
                {name: "Venezuela", code: "VE", dial: "58"},
                {name: "Vietnam", code: "VN", dial: "84"},
                {name: "Yemen", code: "YE", dial: "967"},
                {name: "Zimbabwe", code: "ZW", dial: "263"}
            ];

            var selectedCountry = countries.find(function(c) { return c.code === "IN"; }) || countries[0];
            var dialSpan = phoneMeta.querySelector('.gwf__phone-dial');

            // Create dropdown container
            var dropdown = document.createElement('div');
            dropdown.className = 'gwf__country-dropdown';
            
            // Create country list
            var countryList = document.createElement('div');
            countryList.className = 'gwf__country-list';
            
            // Function to convert country code to flag emoji
            function getFlagEmoji(countryCode) {
                if (!countryCode || countryCode.length !== 2) return '🌐';
                var codePoints = countryCode
                    .toUpperCase()
                    .split('')
                    .map(function(char) { 
                        return 127397 + char.charCodeAt(0); 
                    });
                return String.fromCodePoint.apply(null, codePoints);
            }
            
            function renderCountries() {
                countryList.innerHTML = '';
                
                countries.forEach(function(country) {
                    var option = document.createElement('div');
                    option.className = 'gwf__country-option';
                    if (country.code === selectedCountry.code) {
                        option.classList.add('is-selected');
                    }
                    var flag = getFlagEmoji(country.code);
                    option.innerHTML = '<span class="gwf__country-flag">' + flag + '</span>' +
                                      '<span class="gwf__country-name">' + country.name + '</span>' +
                                      '<span class="gwf__country-code">+' + country.dial + '</span>';
                    option.onclick = function() {
                        selectedCountry = country;
                        var flag = getFlagEmoji(country.code);
                        dialSpan.textContent = flag + ' +' + country.dial;
                        dropdown.classList.remove('is-open');
                        phoneMeta.classList.remove('is-open');
                        renderCountries();
                    };
                    countryList.appendChild(option);
                });
            }
            
            dropdown.appendChild(countryList);
            phoneMeta.appendChild(dropdown);
            
            renderCountries();
            
            // Position dropdown function
            function positionDropdown() {
                var rect = phoneMeta.getBoundingClientRect();
                var modalContent = document.querySelector('.modal_content');
                var modalRect = modalContent ? modalContent.getBoundingClientRect() : modal.getBoundingClientRect();
                
                dropdown.style.top = (rect.bottom + 4) + 'px';
                
                // Check if mobile
                if (window.innerWidth <= 500) {
                    dropdown.style.left = '20px';
                    dropdown.style.right = '20px';
                    dropdown.style.width = 'auto';
                } else {
                    dropdown.style.left = modalRect.left + 30 + 'px';
                    dropdown.style.width = (modalRect.width - 60) + 'px';
                    dropdown.style.right = 'auto';
                }
            }
            
            // Toggle dropdown
            phoneMeta.onclick = function(e) {
                e.stopPropagation();
                var wasOpen = dropdown.classList.contains('is-open');
                dropdown.classList.toggle('is-open');
                phoneMeta.classList.toggle('is-open');
                
                // Position and scroll when opening
                if (!wasOpen && dropdown.classList.contains('is-open')) {
                    positionDropdown();
                    setTimeout(function() {
                        var selected = dropdown.querySelector('.gwf__country-option.is-selected');
                        if (selected) {
                            var listContainer = dropdown.querySelector('.gwf__country-list');
                            // Scroll selected country to top of visible area with some offset
                            var scrollPosition = selected.offsetTop - 60;
                            listContainer.scrollTop = Math.max(0, scrollPosition);
                        }
                    }, 100);
                }
            };
            
            // Reposition on scroll/resize
            window.addEventListener('scroll', function() {
                if (dropdown.classList.contains('is-open')) {
                    positionDropdown();
                }
            }, true);
            
            window.addEventListener('resize', function() {
                if (dropdown.classList.contains('is-open')) {
                    positionDropdown();
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!phoneMeta.contains(e.target)) {
                    dropdown.classList.remove('is-open');
                    phoneMeta.classList.remove('is-open');
                }
            });
            
            // Set initial value
            var initialFlag = getFlagEmoji(selectedCountry.code);
            dialSpan.textContent = initialFlag + ' +' + selectedCountry.dial;
        }, 500);
    }

    // Initialize country selector when modal opens
    if (openBtn) {
        var originalClick = openBtn.onclick;
        openBtn.onclick = function(e) {
            if (originalClick) originalClick.call(this, e);
            initCountrySelector();
        };
    }
});