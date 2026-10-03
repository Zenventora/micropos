(function (window, document) {
    "use strict";

    function createElement(tagName, className, textContent) {
        var element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (typeof textContent === "string") {
            element.textContent = textContent;
        }

        return element;
    }

    var DEFAULT_COUNTRIES_DATA = {
        countries: [
            ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Cote d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Democratic Republic Of Congo", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Wallis And Futuna", "Yemen", "Zambia", "Zimbabwe", "Aland Islands"],
            ["AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BR", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CK", "CR", "HR", "CU", "CY", "CZ", "CI", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GN", "GW", "GY", "HT", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "SH", "KN", "LC", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "CD", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "VI", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "YE", "ZM", "ZW", "AX"],
            ["93", "355", "213", "1", "376", "244", "1", "1", "54", "374", "297", "61", "43", "994", "1", "973", "880", "1", "375", "32", "501", "229", "1", "975", "591", "387", "267", "55", "1", "673", "359", "226", "257", "855", "237", "1", "238", "1", "236", "235", "56", "86", "57", "269", "242", "682", "506", "385", "53", "357", "420", "225", "45", "253", "1", "1", "593", "20", "503", "240", "291", "372", "251", "500", "298", "679", "358", "33", "594", "689", "241", "220", "995", "49", "233", "350", "30", "299", "1", "590", "1", "502", "224", "245", "592", "509", "504", "852", "36", "354", "91", "62", "98", "964", "353", "972", "39", "1", "81", "962", "7", "254", "686", "383", "965", "996", "856", "371", "961", "266", "231", "218", "423", "370", "352", "853", "389", "261", "265", "60", "960", "223", "356", "692", "596", "222", "230", "52", "691", "373", "377", "976", "382", "1", "212", "258", "95", "264", "674", "977", "31", "599", "687", "64", "505", "227", "234", "683", "850", "1", "47", "968", "92", "680", "970", "507", "675", "595", "51", "63", "48", "351", "1", "974", "262", "40", "7", "250", "290", "1", "1", "508", "1", "685", "378", "239", "966", "221", "381", "248", "232", "65", "421", "386", "677", "252", "27", "82", "34", "94", "249", "597", "268", "46", "41", "963", "886", "992", "255", "66", "243", "670", "228", "690", "676", "1", "216", "90", "993", "1", "688", "1", "256", "380", "971", "44", "1", "598", "998", "678", "379", "58", "84", "681", "967", "260", "263", "672"]
        ]
    };

    var zswf_mail_rgx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var zswf_mbe_rgx = /^[0-9 +\-()]{7,16}$/;
    var zswf_nbr_rgx = /^[0-9]{1,14}$/;
    var zswf_website_rgx = /^([a-zA-Z0-9_.+-])+\.([a-zA-Z0-9.,?'\\+&%$#=~_\-])/;

    function normalizeCountries(countriesData) {
        if (!countriesData) {
            return [];
        }

        if (Array.isArray(countriesData) && countriesData.length && typeof countriesData[0] === "object" && !Array.isArray(countriesData[0])) {
            return countriesData.map(function (country) {
                return {
                    code: String(country.code || country.countryCode || "").toUpperCase(),
                    name: String(country.name || country.countryName || ""),
                    dialCode: String(country.dialCode || country.phoneCode || "").replace(/^\+/, "")
                };
            }).filter(function (country) {
                return country.code && country.name;
            });
        }

        if (countriesData.countries && Array.isArray(countriesData.countries) && countriesData.countries.length >= 3) {
            return countriesData.countries[0].map(function (name, index) {
                return {
                    name: String(name || ""),
                    code: String(countriesData.countries[1][index] || "").toUpperCase(),
                    dialCode: String(countriesData.countries[2][index] || "").replace(/^\+/, "")
                };
            }).filter(function (country) {
                return country.code && country.name;
            });
        }

        return [];
    }

    function humanizeName(value) {
        return String(value || "")
            .replace(/[_-]+/g, " ")
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "")
            .replace(/\b[a-z]/g, function (char) {
                return char.toUpperCase();
            });
    }

    function buildFileInfo(field) {
        var info = [];

        if (Array.isArray(field.accept) && field.accept.length) {
            info.push("Supported formats: " + field.accept.join(", ") + ".");
        }

        if (field.maxSizeMB) {
            info.push("Max file size: " + field.maxSizeMB + " MB.");
        }

        return info.join(" ");
    }

    function normalizeField(field, index) {
        var nextField = Object.assign({}, field || {});
        var type = String(nextField.type || "text").toLowerCase();
        var name = nextField.name || ("field_" + index);
        var defaults = {
            text: {
                label: humanizeName(name),
                placeholder: "Enter a value",
                error: "Please enter a value."
            },
            email: {
                label: humanizeName(name),
                placeholder: "Enter your email address",
                error: "Please enter a valid email address.",
                autocomplete: "email"
            },
            password: {
                label: humanizeName(name),
                placeholder: "Enter a password",
                error: "Please enter a valid password."
            },
            textarea: {
                label: humanizeName(name),
                placeholder: "Enter your message",
                rows: 5,
                error: "Please enter a value."
            },
            select: {
                label: humanizeName(name),
                placeholder: "Select an option",
                error: "Please select a value."
            },
            multiselect: {
                label: humanizeName(name),
                error: "Please select at least one value."
            },
            radio: {
                label: humanizeName(name),
                error: "Please select a value."
            },
            country: {
                label: "Country",
                placeholder: "Select your country",
                error: "Please select a country.",
                codeName: name + "_code",
                dialCodeName: name + "_dial_code"
            },
            phone: {
                label: "Phone Number",
                placeholder: "Phone",
                error: "Please enter a valid phone number.",
                countryCodeName: name + "_country_code",
                countryNameName: name + "_country_name",
                dialCodeName: name + "_dial_code",
                numberName: name + "_number"
            },
            file: {
                label: humanizeName(name),
                fileText: "Attach file",
                error: "Please choose a valid file."
            },
            checkbox: {
                label: humanizeName(name),
                error: "Please check this box.",
                checkedValue: "accepted",
                uncheckedValue: "rejected"
            },
            captcha: {
                label: "Security Check",
                placeholder: "Enter the result",
                refreshLabel: "New Question",
                error: "Please enter the correct security answer.",
                promptName: name + "_prompt",
                tokenName: name + "_token"
            },
            number: {
                label: humanizeName(name),
                placeholder: "Enter a number",
                error: "Please enter a valid number."
            },
            url: {
                label: humanizeName(name),
                placeholder: "https://example.com",
                error: "Please enter a valid URL."
            },
            date: {
                label: humanizeName(name),
                error: "Please enter a valid date."
            }
        };
        var merged = Object.assign({}, defaults[type] || defaults.text, nextField);

        merged.type = type;
        merged.name = name;

        if (type === "multiselect") {
            merged.multiple = true;
            if (!merged.size) {
                merged.size = Math.min(Math.max((merged.options || []).length || 4, 4), 8);
            }
        }

        if (type === "file" && !nextField.infoText) {
            merged.infoText = buildFileInfo(merged);
        }

        return merged;
    }

    function emailIsValid(value) {
        return zswf_mail_rgx.test(String(value || "").trim());
    }

    function phoneIsValid(value) {
        return zswf_mbe_rgx.test(String(value || "").trim());
    }

    function numberIsValid(value) {
        return zswf_nbr_rgx.test(String(value || "").trim());
    }

    function patternIsValid(value, pattern) {
        var expression = pattern;

        if (!expression) {
            return true;
        }

        if (!(expression instanceof RegExp)) {
            expression = new RegExp(expression);
        }

        return expression.test(String(value || ""));
    }

    function urlIsValid(value) {
        var normalized = String(value || "").trim();

        if (!normalized) {
            return false;
        }

        normalized = normalized
            .replace(/^https?:\/\//i, "")
            .replace(/^www\./i, "www.");

        return zswf_website_rgx.test(normalized);
    }

    function fileMatchesAccept(file, acceptList) {
        if (!acceptList || !acceptList.length) {
            return true;
        }

        var extension = "." + String(file.name || "").split(".").pop().toLowerCase();
        var mimeType = String(file.type || "").toLowerCase();

        return acceptList.some(function (acceptValue) {
            var normalized = String(acceptValue || "").trim().toLowerCase();

            if (!normalized) {
                return false;
            }

            if (normalized.charAt(0) === ".") {
                return extension === normalized;
            }

            if (normalized.indexOf("/") > -1) {
                if (normalized.slice(-2) === "/*") {
                    return mimeType.indexOf(normalized.slice(0, -1)) === 0;
                }

                return mimeType === normalized;
            }

            return extension === "." + normalized;
        });
    }

    function formatFileSize(bytes) {
        var value = Number(bytes || 0);

        if (!value) {
            return "0 KB";
        }

        if (value >= 1024 * 1024) {
            return (value / (1024 * 1024)).toFixed(1).replace(/\.0$/, "") + " MB";
        }

        return Math.max(1, Math.round(value / 1024)) + " KB";
    }

    function defaultMessageForType(type) {
        var messages = {
            text: "Please enter a value.",
            email: "Please enter a valid email address.",
            tel: "Please enter a valid phone number.",
            phone: "Please enter a valid phone number.",
            textarea: "Please enter a value.",
            select: "Please select a value.",
            multiselect: "Please select at least one value.",
            radio: "Please select a value.",
            country: "Please select a country.",
            checkbox: "Please check this box.",
            captcha: "Please enter the correct security answer.",
            file: "Please choose a valid file.",
            number: "Please enter a valid number.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            password: "Please enter a valid password."
        };

        return messages[type] || "Please enter a valid value.";
    }

    function WebformPlugin(options) {
        this.options = Object.assign({
            formId: "",
            design: "normal",
            mode: "light",
            title: "",
            desc: "",
            subject: "",
            subjectFieldName: "subject",
            hiddenFields: [],
            fields: [],
            submitLabel: "Submit",
            loadingLabel: "Submitting...",
            successMessage: "Submitted successfully.",
            errorMessage: "Something went wrong. Please try again.",
            resetOnSuccess: true,
            autoDetectCountry: false,
            defaultCountryCode: "",
            geoEndpoint: "https://ipapi.co/json/",
            initialOpen: true,
            triggerSelector: "",
            closeOnOverlay: true,
            endpoint: "",
            method: "POST",
            submitAs: "json",
            headers: {},
            detectCountry: null,
            onSubmit: null,
            countriesData: DEFAULT_COUNTRIES_DATA
        }, options || {});

        this.mount = document.getElementById(this.options.formId);
        this.countries = normalizeCountries(this.options.countriesData || DEFAULT_COUNTRIES_DATA);
        this.countryLookupByCode = {};
        this.countryLookupByName = {};
        this.fieldEntries = [];
        this.statusTimer = null;
        this.detectedCountryCode = String(this.options.defaultCountryCode || "").toUpperCase();
        this.root = null;
        this.form = null;
        this.status = null;
        this.submitButton = null;
        this.isSideForm = this.options.design === "side";
        this.lastFocusedElement = null;
        this.sideKeydownHandler = this.handleSideKeydown.bind(this);
        this.focusableSelector = 'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        this.countries.forEach(function (country) {
            this.countryLookupByCode[country.code] = country;
            this.countryLookupByName[country.name] = country;
        }, this);

        if (!this.mount) {
            return;
        }

        this.render();
        this.bindSideForm();
        this.applyInitialCountry();
    }

    WebformPlugin.prototype.render = function () {
        var rootClass = "gwf gwf--" + this.options.design;
        var root = createElement("div", rootClass);
        var box = createElement("div", "gwf__box");
        var header = createElement("div", "gwf__header");
        var status = createElement("div", "gwf__status");
        var form = createElement("form", "gwf__form");
        var title = null;
        var desc = null;
        var overlay = null;
        var closeButton = null;

        if (this.options.mode === "dark") {
            root.classList.add("is-dark");
        }

        if (this.isSideForm) {
            overlay = createElement("button", "gwf__overlay");
            overlay.type = "button";
            overlay.setAttribute("aria-label", "Close form");
            root.appendChild(overlay);

            closeButton = createElement("button", "gwf__close", "Close");
            closeButton.type = "button";
            closeButton.setAttribute("aria-label", "Close form");
            box.appendChild(closeButton);
        }

        if (this.options.title) {
            title = createElement("h2", "gwf__title", this.options.title);
            title.id = this.options.formId + "_title";
            header.appendChild(title);
        }

        if (this.options.desc) {
            desc = createElement("p", "gwf__desc", this.options.desc);
            desc.id = this.options.formId + "_desc";
            header.appendChild(desc);
        }

        if (header.children.length) {
            box.appendChild(header);
        }

        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        status.setAttribute("aria-atomic", "true");
        box.appendChild(status);

        form.noValidate = true;
        box.appendChild(form);
        root.appendChild(box);

        this.mount.innerHTML = "";
        this.mount.appendChild(root);

        this.root = root;
        this.form = form;
        this.status = status;

        if (this.isSideForm) {
            box.setAttribute("role", "dialog");
            box.setAttribute("aria-modal", "true");
            box.setAttribute("aria-hidden", this.options.initialOpen ? "false" : "true");

            if (title) {
                box.setAttribute("aria-labelledby", title.id);
            } else {
                box.setAttribute("aria-label", "Form dialog");
            }

            if (desc) {
                box.setAttribute("aria-describedby", desc.id);
            }
        }

        this.appendHiddenField(this.options.subjectFieldName, this.options.subject || "");
        this.options.hiddenFields.forEach(function (field) {
            if (field && field.name) {
                this.appendHiddenField(field.name, field.value || "");
            }
        }, this);

        this.options.fields.forEach(function (field, index) {
            this.renderField(field, index);
        }, this);

        this.submitButton = createElement("button", "gwf__submit", this.options.submitLabel);
        this.submitButton.type = "submit";

        var actionRow = createElement("div", "gwf__actions");
        actionRow.appendChild(this.submitButton);
        this.form.appendChild(actionRow);

        this.form.addEventListener("submit", this.handleSubmit.bind(this));

        if (this.isSideForm && this.options.initialOpen) {
            this.root.classList.add("is-open");
        }
    };

    WebformPlugin.prototype.bindSideForm = function () {
        var trigger;
        var overlay;
        var closeButton;

        if (!this.isSideForm || !this.root) {
            return;
        }

        overlay = this.root.querySelector(".gwf__overlay");
        closeButton = this.root.querySelector(".gwf__close");

        if (overlay && this.options.closeOnOverlay) {
            overlay.addEventListener("click", this.close.bind(this));
        }

        if (closeButton) {
            closeButton.addEventListener("click", this.close.bind(this));
        }

        if (this.options.triggerSelector) {
            trigger = document.querySelector(this.options.triggerSelector);

            if (trigger) {
                trigger.addEventListener("click", function (event) {
                    event.preventDefault();
                    this.open();
                }.bind(this));
            }
        }

        this.syncSideFormA11yState(this.root.classList.contains("is-open"));
    };

    WebformPlugin.prototype.open = function () {
        if (this.root) {
            this.lastFocusedElement = document.activeElement;
            this.root.classList.add("is-open");
            this.syncSideFormA11yState(true);
            this.focusFirstInteractiveElement();
        }
    };

    WebformPlugin.prototype.close = function () {
        if (this.root) {
            this.root.classList.remove("is-open");
            this.syncSideFormA11yState(false);

            if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === "function") {
                this.lastFocusedElement.focus();
            }
        }
    };

    WebformPlugin.prototype.syncSideFormA11yState = function (isOpen) {
        var box;

        if (!this.isSideForm || !this.root) {
            return;
        }

        box = this.root.querySelector(".gwf__box");

        if (box) {
            box.setAttribute("aria-hidden", isOpen ? "false" : "true");
        }

        document.removeEventListener("keydown", this.sideKeydownHandler);

        if (isOpen) {
            document.addEventListener("keydown", this.sideKeydownHandler);
        }
    };

    WebformPlugin.prototype.handleSideKeydown = function (event) {
        var focusable;
        var first;
        var last;

        if (!this.root || !this.root.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            this.close();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        focusable = this.getFocusableElements();

        if (!focusable.length) {
            return;
        }

        first = focusable[0];
        last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    WebformPlugin.prototype.getFocusableElements = function () {
        var box = this.root ? this.root.querySelector(".gwf__box") : null;

        if (!box) {
            return [];
        }

        return Array.prototype.slice.call(box.querySelectorAll(this.focusableSelector)).filter(function (element) {
            return element.offsetParent !== null;
        });
    };

    WebformPlugin.prototype.focusFirstInteractiveElement = function () {
        var focusable = this.getFocusableElements();

        if (focusable.length) {
            focusable[0].focus();
        }
    };

    WebformPlugin.prototype.appendHiddenField = function (name, value) {
        var input = createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        this.form.appendChild(input);
        return input;
    };

    WebformPlugin.prototype.renderField = function (field, index) {
        field = normalizeField(field, index);

        var type = field.type;
        var name = field.name;
        var group = createElement("div", "gwf__group gwf__group--" + type);
        var label;
        var error;
        var helper;
        var entry;

        if (field.width === "half") {
            group.classList.add("gwf__group--half");
        } else if (field.width === "third") {
            group.classList.add("gwf__group--third");
        }

        if (type !== "checkbox" && !field.hideLabel) {
            label = createElement("label", "gwf__label", field.label || name);
            label.htmlFor = name;
            label.id = name + "_label";

            if (field.required) {
                label.appendChild(createElement("span", "gwf__required", "*"));
            }

            group.appendChild(label);
        }

        entry = {
            field: field,
            type: type,
            group: group,
            name: name
        };

        this["render_" + type] ? this["render_" + type](entry) : this.render_input(entry);

        if (field.helperText) {
            helper = createElement("div", "gwf__helper", field.helperText);
            helper.id = name + "_helper";
            group.appendChild(helper);
            entry.helper = helper;
        }

        error = createElement("div", "gwf__error");
        error.id = name + "_error";
        error.setAttribute("aria-live", "polite");
        error.setAttribute("aria-atomic", "true");
        group.appendChild(error);
        entry.error = error;
        entry.label = label || null;

        this.fieldEntries.push(entry);
        this.form.appendChild(group);
        this.syncEntryAccessibility(entry);
        this.bindFieldValidation(entry);
    };

    WebformPlugin.prototype.render_input = function (entry) {
        var field = entry.field;
        var input = createElement("input", "gwf__control");

        input.type = field.type || "text";
        input.id = entry.name;
        input.name = field.name;
        input.placeholder = field.placeholder || "";
        input.autocomplete = field.autocomplete || "";
        input.value = field.value || "";
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;

        if (field.maxLength) {
            input.maxLength = field.maxLength;
        }

        entry.input = input;
        entry.group.appendChild(input);
    };

    WebformPlugin.prototype.render_textarea = function (entry) {
        var field = entry.field;
        var input = createElement("textarea", "gwf__control gwf__control--textarea");

        input.id = entry.name;
        input.name = field.name;
        input.placeholder = field.placeholder || "";
        input.rows = field.rows || 5;
        input.value = field.value || "";
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;

        if (field.maxLength) {
            input.maxLength = field.maxLength;
        }

        entry.input = input;
        entry.group.appendChild(input);
    };

    WebformPlugin.prototype.render_select = function (entry) {
        var field = entry.field;
        var input = createElement("select", "gwf__control");
        var placeholderOption;

        input.id = entry.name;
        input.name = field.name;
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;

        placeholderOption = createElement("option", "", field.placeholder || "Select an option");
        placeholderOption.value = "";
        input.appendChild(placeholderOption);

        (field.options || []).forEach(function (option) {
            var optionElement = createElement("option");

            if (typeof option === "object") {
                optionElement.value = option.value;
                optionElement.textContent = option.label;
            } else {
                optionElement.value = option;
                optionElement.textContent = option;
            }

            input.appendChild(optionElement);
        });

        if (field.value) {
            input.value = field.value;
        }

        entry.input = input;
        entry.group.appendChild(input);
    };

    WebformPlugin.prototype.render_multiselect = function (entry) {
        var field = entry.field;
        var input = createElement("select", "gwf__control");

        input.id = entry.name;
        input.name = field.name;
        input.multiple = true;
        input.size = field.size || 4;
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;

        (field.options || []).forEach(function (option) {
            var optionElement = createElement("option");
            var optionValue = typeof option === "object" ? option.value : option;
            var optionLabel = typeof option === "object" ? option.label : option;

            optionElement.value = optionValue;
            optionElement.textContent = optionLabel;

            if (Array.isArray(field.value) && field.value.indexOf(optionValue) > -1) {
                optionElement.selected = true;
            }

            input.appendChild(optionElement);
        });

        entry.input = input;
        entry.group.appendChild(input);
    };

    WebformPlugin.prototype.render_radio = function (entry) {
        var field = entry.field;
        var wrap = createElement("div", "gwf__choices");
        var inputs = [];

        wrap.setAttribute("role", "radiogroup");
        if (entry.label && entry.label.id) {
            wrap.setAttribute("aria-labelledby", entry.label.id);
        }
        if (field.required) {
            wrap.setAttribute("aria-required", "true");
        }

        (field.options || []).forEach(function (option, optionIndex) {
            var optionValue = typeof option === "object" ? option.value : option;
            var optionLabel = typeof option === "object" ? option.label : option;
            var label = createElement("label", "gwf__choice");
            var input = createElement("input");
            var textNode = createElement("span", "gwf__choice-text", optionLabel);

            input.type = "radio";
            input.name = field.name;
            input.id = entry.name + "_" + optionIndex;
            input.value = optionValue;
            input.checked = field.value === optionValue;

            label.appendChild(input);
            label.appendChild(textNode);
            wrap.appendChild(label);
            inputs.push(input);
        });

        entry.inputs = inputs;
        entry.choiceWrap = wrap;
        entry.group.appendChild(wrap);
    };

    WebformPlugin.prototype.render_country = function (entry) {
        var field = entry.field;
        var input = createElement("select", "gwf__control");
        var placeholderOption = createElement("option", "", field.placeholder || "Select your country");
        var hiddenCode = null;
        var hiddenDial = null;

        input.id = entry.name;
        input.name = field.name;
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;
        placeholderOption.value = "";
        input.appendChild(placeholderOption);

        this.countries.forEach(function (country) {
            var option = createElement("option");
            option.value = country.name;
            option.textContent = country.name;
            option.dataset.code = country.code;
            option.dataset.name = country.name;
            option.dataset.dial = country.dialCode;
            input.appendChild(option);
        });

        if (field.codeName) {
            hiddenCode = this.appendHiddenField(field.codeName, "");
        }

        if (field.dialCodeName) {
            hiddenDial = this.appendHiddenField(field.dialCodeName, "");
        }

        input.addEventListener("change", function () {
            this.syncCountryField(entry);
            this.syncPhoneFields();
        }.bind(this));

        entry.input = input;
        entry.hiddenCode = hiddenCode;
        entry.hiddenDial = hiddenDial;
        entry.group.appendChild(input);
    };

    WebformPlugin.prototype.render_phone = function (entry) {
        var field = entry.field;
        var wrap = createElement("div", "gwf__phone");
        var meta = createElement("div", "gwf__phone-meta");
        var dial = createElement("span", "gwf__phone-dial", "");
        var input = createElement("input", "gwf__control");
        var fullHidden = this.appendHiddenField(field.name, "");
        var numberHidden = field.numberName ? this.appendHiddenField(field.numberName, "") : null;
        var countryCodeHidden = field.countryCodeName ? this.appendHiddenField(field.countryCodeName, "") : null;
        var countryNameHidden = field.countryNameName ? this.appendHiddenField(field.countryNameName, "") : null;
        var dialHidden = field.dialCodeName ? this.appendHiddenField(field.dialCodeName, "") : null;

        input.type = "tel";
        input.id = entry.name;
        input.placeholder = field.placeholder || "";
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;
        meta.appendChild(dial);
        wrap.appendChild(meta);
        wrap.appendChild(input);

        input.addEventListener("input", this.syncPhoneEntry.bind(this, entry));

        entry.input = input;
        entry.dial = dial;
        entry.fullHidden = fullHidden;
        entry.numberHidden = numberHidden;
        entry.countryCodeHidden = countryCodeHidden;
        entry.countryNameHidden = countryNameHidden;
        entry.dialHidden = dialHidden;
        entry.group.appendChild(wrap);
    };

    WebformPlugin.prototype.render_checkbox = function (entry) {
        var field = entry.field;
        var label = createElement("label", "gwf__checkbox");
        var toggle = createElement("input");
        var textNode = createElement("span", "gwf__checkbox-text", field.label || field.name || "");
        var hiddenValue = this.appendHiddenField(field.name, field.checked ? (field.checkedValue || "accepted") : (field.uncheckedValue || "rejected"));
        var hiddenMessage = field.messageName ? this.appendHiddenField(field.messageName, field.messageValue || field.label || "") : null;

        toggle.type = "checkbox";
        toggle.checked = !!field.checked;
        toggle.required = !!field.required;

        label.appendChild(toggle);
        label.appendChild(textNode);

        toggle.addEventListener("change", function () {
            hiddenValue.value = toggle.checked ? (field.checkedValue || "accepted") : (field.uncheckedValue || "rejected");
        });

        entry.toggle = toggle;
        entry.hiddenValue = hiddenValue;
        entry.hiddenMessage = hiddenMessage;
        entry.group.appendChild(label);
    };

    WebformPlugin.prototype.render_file = function (entry) {
        var field = entry.field;
        var wrap = createElement("label", "gwf__file");
        var top = createElement("div", "gwf__file-top");
        var title = createElement("span", "gwf__file-title", field.fileText || "Choose files");
        var badge = createElement("span", "gwf__file-badge", field.actionText || "Browse");
        var hint = createElement("span", "gwf__file-hint", field.infoText || "Drop files here or browse");
        var input = createElement("input");
        var list = createElement("ul", "gwf__files");

        input.type = "file";
        input.id = entry.name;
        input.name = field.name;
        input.multiple = !!field.multiple;
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;
        entry.selectedFiles = [];

        if (field.accept && field.accept.length) {
            input.accept = field.accept.join(",");
        }

        input.addEventListener("change", function () {
            this.handleFileInputChange(entry);
        }.bind(this));

        top.appendChild(title);
        top.appendChild(badge);
        wrap.appendChild(top);
        wrap.appendChild(hint);
        wrap.appendChild(input);
        entry.input = input;
        entry.fileHint = hint;
        entry.fileTitle = title;
        entry.fileList = list;
        entry.fileList.id = entry.name + "_files";
        entry.fileList.setAttribute("aria-live", "polite");
        entry.group.appendChild(wrap);
        entry.group.appendChild(list);
    };

    WebformPlugin.prototype.render_captcha = function (entry) {
        var field = entry.field;
        var box = createElement("div", "gwf__captcha");
        var question = createElement("p", "gwf__captcha-question", "Loading security question...");
        var row = createElement("div", "gwf__captcha-row");
        var input = createElement("input", "gwf__control");
        var refresh = createElement("button", "gwf__captcha-refresh", field.refreshLabel || "New Question");
        var promptHidden = field.promptName ? this.appendHiddenField(field.promptName, "") : null;
        var tokenHidden = field.tokenName ? this.appendHiddenField(field.tokenName, "") : null;

        input.type = "text";
        input.id = entry.name;
        input.name = field.name;
        input.placeholder = field.placeholder || "";
        input.setAttribute("aria-label", field.ariaLabel || field.label || field.name || "");
        input.required = !!field.required;

        refresh.type = "button";
        refresh.setAttribute("aria-label", "Load a new security question");
        refresh.addEventListener("click", function () {
            this.loadCaptcha(entry, true);
        }.bind(this));

        row.appendChild(input);
        row.appendChild(refresh);
        box.appendChild(question);
        box.appendChild(row);

        entry.input = input;
        entry.question = question;
        entry.question.id = entry.name + "_question";
        entry.refresh = refresh;
        entry.promptHidden = promptHidden;
        entry.tokenHidden = tokenHidden;
        entry.challenge = null;
        entry.group.appendChild(box);

        this.loadCaptcha(entry, false);
    };

    WebformPlugin.prototype.applyInitialCountry = function () {
        if (!this.options.autoDetectCountry) {
            if (this.detectedCountryCode) {
                this.setCountryCode(this.detectedCountryCode);
            }
            return;
        }

        this.detectCountry().then(function (countryCode) {
            if (countryCode) {
                this.detectedCountryCode = countryCode;
                this.setCountryCode(countryCode);
            }
        }.bind(this));
    };

    WebformPlugin.prototype.detectCountry = function () {
        var customDetector = this.options.detectCountry;

        if (typeof customDetector === "function") {
            return Promise.resolve(customDetector());
        }

        if (typeof window.fetch !== "function") {
            return Promise.resolve(this.detectCountryFromLocale());
        }

        return window.fetch(this.options.geoEndpoint)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("country-lookup-failed");
                }

                return response.json();
            })
            .then(function (data) {
                return String((data && (data.country_code || data.countryCode || data.country)) || "").toUpperCase();
            })
            .catch(function () {
                return this.detectCountryFromLocale();
            }.bind(this));
    };

    WebformPlugin.prototype.detectCountryFromLocale = function () {
        var locale = String((window.navigator && (window.navigator.language || window.navigator.userLanguage)) || "");
        var parts = locale.split("-");
        return parts[1] ? parts[1].toUpperCase() : "";
    };

    WebformPlugin.prototype.setCountryCode = function (countryCode) {
        var country = this.countryLookupByCode[String(countryCode || "").toUpperCase()];

        if (!country) {
            return;
        }

        this.fieldEntries.forEach(function (entry) {
            if (entry.type === "country" && entry.input) {
                entry.input.value = country.name;
                this.syncCountryField(entry);
            }

            if (entry.type === "phone") {
                this.syncPhoneEntry(entry);
            }
        }, this);
    };

    WebformPlugin.prototype.syncCountryField = function (entry) {
        var selectedOption = entry.input.options[entry.input.selectedIndex];

        if (!selectedOption || !selectedOption.value) {
            if (entry.hiddenCode) {
                entry.hiddenCode.value = "";
            }

            if (entry.hiddenDial) {
                entry.hiddenDial.value = "";
            }

            return;
        }

        if (entry.hiddenCode) {
            entry.hiddenCode.value = selectedOption.dataset.code || "";
        }

        if (entry.hiddenDial) {
            entry.hiddenDial.value = selectedOption.dataset.dial || "";
        }
    };

    WebformPlugin.prototype.syncPhoneEntry = function (entry) {
        var country = this.getSelectedCountry();
        var dialCode = country && country.dialCode ? country.dialCode : "";
        var numberValue = String(entry.input.value || "").trim();

        entry.dial.textContent = dialCode ? "+" + dialCode : "+";
        entry.fullHidden.value = [dialCode ? "+" + dialCode : "", numberValue].filter(Boolean).join(" ").trim();

        if (entry.numberHidden) {
            entry.numberHidden.value = numberValue;
        }

        if (entry.countryCodeHidden) {
            entry.countryCodeHidden.value = country ? country.code : "";
        }

        if (entry.countryNameHidden) {
            entry.countryNameHidden.value = country ? country.name : "";
        }

        if (entry.dialHidden) {
            entry.dialHidden.value = dialCode;
        }
    };

    WebformPlugin.prototype.syncPhoneFields = function () {
        this.fieldEntries.forEach(function (entry) {
            if (entry.type === "phone") {
                this.syncPhoneEntry(entry);
            }
        }, this);
    };

    WebformPlugin.prototype.getSelectedCountry = function () {
        var countryEntry = null;
        var selectedOption = null;

        this.fieldEntries.some(function (entry) {
            if (entry.type === "country" && entry.input) {
                countryEntry = entry;
                return true;
            }
            return false;
        });

        if (countryEntry) {
            selectedOption = countryEntry.input.options[countryEntry.input.selectedIndex];
            if (selectedOption && selectedOption.value) {
                return {
                    code: selectedOption.dataset.code || "",
                    name: selectedOption.dataset.name || "",
                    dialCode: selectedOption.dataset.dial || ""
                };
            }

            if (this.countryLookupByName[String(countryEntry.input.value || "").trim()]) {
                return this.countryLookupByName[String(countryEntry.input.value || "").trim()];
            }
        }

        if (this.detectedCountryCode && this.countryLookupByCode[this.detectedCountryCode]) {
            return this.countryLookupByCode[this.detectedCountryCode];
        }

        return null;
    };

    WebformPlugin.prototype.loadCaptcha = function (entry, forceRefresh) {
        var loader = typeof entry.field.loadChallenge === "function" ? entry.field.loadChallenge : this.defaultCaptchaLoader;
        var questionPrefix = entry.field.questionPrefix || "";

        entry.refresh.disabled = true;
        entry.question.textContent = "Loading security question...";

        Promise.resolve(loader({
            forceRefresh: !!forceRefresh,
            previousChallenge: entry.challenge || null
        }))
            .then(function (challenge) {
                var questionText;

                entry.challenge = challenge || null;
                questionText = challenge && challenge.prompt ? challenge.prompt : "Security question";
                entry.question.textContent = questionPrefix + questionText;

                if (entry.promptHidden) {
                    entry.promptHidden.value = challenge && challenge.prompt ? challenge.prompt : "";
                }

                if (entry.tokenHidden) {
                    entry.tokenHidden.value = challenge && challenge.token ? challenge.token : "";
                }

                entry.input.value = "";
            })
            .catch(function () {
                entry.challenge = null;
                entry.question.textContent = entry.field.loadErrorMessage || "Unable to load security question.";
            })
            .finally(function () {
                entry.refresh.disabled = false;
            });
    };

    WebformPlugin.prototype.defaultCaptchaLoader = function () {
        // var first = Math.floor(Math.random() * 10) + 1;
        // var second = Math.floor(Math.random() * 10) + 1;

        // return Promise.resolve({
        //     prompt: "What is " + first + " + " + second + "?",
        //     expectedAnswer: String(first + second),
        //     token: "captcha-" + Date.now()
        // });
    };

    WebformPlugin.prototype.renderFileList = function (entry) {
        var files = entry.selectedFiles || [];
        entry.fileList.innerHTML = "";

        files.forEach(function (file, index) {
            var item = createElement("li", "gwf__files-item");
            var meta = createElement("div", "gwf__files-meta");
            var name = createElement("span", "gwf__files-name", file.name);
            var size = createElement("span", "gwf__files-size", formatFileSize(file.size));
            var remove = createElement("button", "gwf__files-remove", "Remove");

            remove.type = "button";
            remove.setAttribute("aria-label", "Remove " + file.name);
            remove.addEventListener("click", function () {
                entry.selectedFiles.splice(index, 1);
                this.renderFileList(entry);
                if (!entry.selectedFiles.length) {
                    this.clearFieldError(entry);
                }
            }.bind(this));

            meta.appendChild(name);
            meta.appendChild(size);
            item.appendChild(meta);
            item.appendChild(remove);
            entry.fileList.appendChild(item);
        }, this);
    };

    WebformPlugin.prototype.handleFileInputChange = function (entry) {
        var field = entry.field;
        var incomingFiles = Array.prototype.slice.call(entry.input.files || []);
        var maxBytes = Number(field.maxSizeMB || 0) * 1024 * 1024;
        var nextFiles = field.multiple ? (entry.selectedFiles || []).slice() : [];
        var hasInvalidFile = false;

        incomingFiles.forEach(function (file) {
            if (maxBytes && file.size > maxBytes) {
                hasInvalidFile = true;
                return;
            }

            if (!fileMatchesAccept(file, field.accept || [])) {
                hasInvalidFile = true;
                return;
            }

            if (!field.multiple) {
                nextFiles = [file];
                return;
            }

            nextFiles.push(file);
        });

        entry.selectedFiles = nextFiles;
        entry.input.value = "";
        this.renderFileList(entry);

        if (hasInvalidFile) {
            this.setFieldError(entry, field.error || defaultMessageForType("file"));
        } else {
            this.clearFieldError(entry);
        }
    };

    WebformPlugin.prototype.bindFieldValidation = function (entry) {
        var validate = this.validateField.bind(this, entry);

        if (entry.type === "file" || entry.field.liveValidate === false) {
            return;
        }

        if (entry.type === "checkbox" && entry.toggle) {
            entry.toggle.addEventListener("change", validate);
            return;
        }

        if (entry.type === "radio" && entry.inputs) {
            entry.inputs.forEach(function (input) {
                input.addEventListener("change", validate);
            });
            return;
        }

        if ((entry.type === "select" || entry.type === "multiselect" || entry.type === "country") && entry.input) {
            entry.input.addEventListener("change", validate);
            return;
        }

        if (entry.input) {
            entry.input.addEventListener("keyup", validate);
            entry.input.addEventListener("change", validate);
            entry.input.addEventListener("blur", validate);
        }
    };

    WebformPlugin.prototype.clearFieldError = function (entry) {
        entry.group.classList.remove("is-invalid");
        entry.error.textContent = "";
        this.getEntryInputElements(entry).forEach(function (element) {
            element.removeAttribute("aria-invalid");
        });

        if (entry.choiceWrap) {
            entry.choiceWrap.removeAttribute("aria-invalid");
        }
    };

    WebformPlugin.prototype.clearErrors = function () {
        this.fieldEntries.forEach(function (entry) {
            this.clearFieldError(entry);
        }, this);
    };

    WebformPlugin.prototype.setFieldError = function (entry, message) {
        entry.group.classList.add("is-invalid");
        entry.error.textContent = message || defaultMessageForType(entry.type);
        this.getEntryInputElements(entry).forEach(function (element) {
            element.setAttribute("aria-invalid", "true");
        });

        if (entry.choiceWrap) {
            entry.choiceWrap.setAttribute("aria-invalid", "true");
        }
    };

    WebformPlugin.prototype.getEntryInputElements = function (entry) {
        if (entry.type === "radio" && entry.inputs) {
            return entry.inputs;
        }

        if (entry.type === "checkbox" && entry.toggle) {
            return [entry.toggle];
        }

        return entry.input ? [entry.input] : [];
    };

    WebformPlugin.prototype.syncEntryAccessibility = function (entry) {
        var describedBy = [];

        if (entry.helper && entry.helper.id) {
            describedBy.push(entry.helper.id);
        }

        if (entry.question && entry.question.id) {
            describedBy.push(entry.question.id);
        }

        if (entry.fileHint) {
            entry.fileHint.id = entry.name + "_hint";
            describedBy.push(entry.fileHint.id);
        }

        if (entry.fileList && entry.fileList.id) {
            describedBy.push(entry.fileList.id);
        }

        if (entry.error && entry.error.id) {
            describedBy.push(entry.error.id);
        }

        this.getEntryInputElements(entry).forEach(function (element) {
            if (describedBy.length) {
                element.setAttribute("aria-describedby", describedBy.join(" "));
            }
        });

        if (entry.choiceWrap && describedBy.length) {
            entry.choiceWrap.setAttribute("aria-describedby", describedBy.join(" "));
        }
    };

    WebformPlugin.prototype.validateField = function (entry) {
        var field = entry.field;
        var value = entry.input ? String(entry.input.value || "").trim() : "";
        var files;
        var maxBytes;
        var acceptList;
        var isValid = true;
        var digitsValue = "";
        var numericValue;
        var customResult;
        var customMessage = "";

        switch (entry.type) {
        case "text":
        case "password":
        case "textarea":
        case "date":
            if (field.required && !value) {
                isValid = false;
            }
            break;

        case "email":
            if (field.required && !value) {
                isValid = false;
            } else if (value && !emailIsValid(value)) {
                isValid = false;
            }
            break;

        case "tel":
            if (field.required && !value) {
                isValid = false;
            } else if (value && !phoneIsValid(value)) {
                isValid = false;
            }
            break;

        case "number":
            if (field.required && !value) {
                isValid = false;
            } else if (value && !numberIsValid(value)) {
                isValid = false;
            }
            break;

        case "url":
            if (field.required && !value) {
                isValid = false;
            } else if (value && !urlIsValid(value)) {
                isValid = false;
            }
            break;

        case "select":
        case "country":
            if (field.required && !value) {
                isValid = false;
            }
            break;

        case "multiselect":
            if (field.required && (!entry.input || !entry.input.selectedOptions || !entry.input.selectedOptions.length)) {
                isValid = false;
            }
            break;

        case "phone":
            value = entry.input ? String(entry.input.value || "").trim() : "";
            if (field.required && !value) {
                isValid = false;
            } else if (value && !phoneIsValid(value)) {
                isValid = false;
            }
            break;

        case "radio":
            if (field.required && (!entry.inputs || !entry.inputs.some(function (input) { return input.checked; }))) {
                isValid = false;
            }
            break;

        case "checkbox":
            if (field.required && entry.toggle && !entry.toggle.checked) {
                isValid = false;
            }
            break;

        case "file":
            files = entry.selectedFiles || [];
            maxBytes = Number(field.maxSizeMB || 0) * 1024 * 1024;
            acceptList = Array.isArray(field.accept) ? field.accept : [];

            if (field.required && !files.length) {
                isValid = false;
                break;
            }

            files.forEach(function (file) {
                if (maxBytes && file.size > maxBytes) {
                    isValid = false;
                }

                if (!fileMatchesAccept(file, acceptList)) {
                    isValid = false;
                }
            });
            break;

        case "captcha":
            if (field.required && !value) {
                isValid = false;
            } else if (value && field.validateOnClient !== false && entry.challenge && entry.challenge.expectedAnswer && value !== String(entry.challenge.expectedAnswer).trim()) {
                isValid = false;
            }
            break;

        default:
            if (field.required && !value) {
                isValid = false;
            }
        }

        if (isValid && value) {
            digitsValue = String(value).replace(/\D/g, "");

            if (field.minLength && String(value).length < Number(field.minLength)) {
                isValid = false;
            }

            if (isValid && field.maxLength && String(value).length > Number(field.maxLength)) {
                isValid = false;
            }

            if (isValid && field.pattern && !patternIsValid(value, field.pattern)) {
                isValid = false;
            }

            if (isValid && field.digitsOnly && !/^\d+$/.test(value)) {
                isValid = false;
            }

            if (isValid && field.minDigits && digitsValue.length < Number(field.minDigits)) {
                isValid = false;
            }

            if (isValid && field.maxDigits && digitsValue.length > Number(field.maxDigits)) {
                isValid = false;
            }

            if (isValid && (field.min !== undefined || field.max !== undefined) && numberIsValid(value)) {
                numericValue = Number(value);

                if (field.min !== undefined && numericValue < Number(field.min)) {
                    isValid = false;
                }

                if (isValid && field.max !== undefined && numericValue > Number(field.max)) {
                    isValid = false;
                }
            }
        }

        if (isValid && typeof field.customValidator === "function") {
            customResult = field.customValidator({
                value: value,
                entry: entry,
                plugin: this
            });

            if (customResult !== true && customResult !== undefined && customResult !== null) {
                isValid = false;
                customMessage = typeof customResult === "string" ? customResult : "";
            }
        }

        if (!isValid) {
            this.setFieldError(entry, customMessage || field.error || defaultMessageForType(entry.type));
        } else {
            this.clearFieldError(entry);
        }

        return isValid;
    };

    WebformPlugin.prototype.getPayload = function () {
        var formData = new FormData(this.form);
        var payload = {};

        this.fieldEntries.forEach(function (entry) {
            if (entry.type === "file") {
                formData.delete(entry.field.name);
                (entry.selectedFiles || []).forEach(function (file) {
                    formData.append(entry.field.name, file);
                });
            }
        });

        formData.forEach(function (value, key) {
            if (value instanceof File) {
                if (!payload[key]) {
                    payload[key] = [];
                }
                payload[key].push(value);
                return;
            }

            if (Object.prototype.hasOwnProperty.call(payload, key)) {
                if (!Array.isArray(payload[key])) {
                    payload[key] = [payload[key]];
                }

                payload[key].push(value);
                return;
            }

            payload[key] = value;
        });

        return {
            payload: payload,
            formData: formData
        };
    };

    WebformPlugin.prototype.showStatus = function (message, type) {
        var className = type === "error" ? "is-error" : "is-success";

        if (!this.status) {
            return;
        }

        this.status.className = "gwf__status " + className;
        this.status.textContent = message;

        if (this.statusTimer) {
            window.clearTimeout(this.statusTimer);
        }

        this.statusTimer = window.setTimeout(function () {
            this.status.className = "gwf__status";
            this.status.textContent = "";
        }.bind(this), 5000);
    };

    WebformPlugin.prototype.reset = function () {
        this.form.reset();
        this.clearErrors();

        this.fieldEntries.forEach(function (entry) {
            if (entry.type === "file" && entry.fileList) {
                entry.selectedFiles = [];
                this.renderFileList(entry);
            }

            if (entry.type === "checkbox" && entry.hiddenValue) {
                entry.hiddenValue.value = entry.field.checked ? (entry.field.checkedValue || "accepted") : (entry.field.uncheckedValue || "rejected");
            }

            if (entry.type === "captcha") {
                this.loadCaptcha(entry, true);
            }
        }, this);

        if (this.detectedCountryCode) {
            this.setCountryCode(this.detectedCountryCode);
        }
    };

    WebformPlugin.prototype.submitWithEndpoint = function (submission) {
        var fetchOptions = {
            method: String(this.options.method || "POST").toUpperCase(),
            headers: Object.assign({}, this.options.headers || {})
        };

        if (this.options.submitAs === "form-data") {
            fetchOptions.body = submission.formData;
        } else {
            fetchOptions.headers["Content-Type"] = "application/json";
            fetchOptions.body = JSON.stringify(submission.payload);
        }

        return window.fetch(this.options.endpoint, fetchOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(this.options.errorMessage);
                }

                return response;
            }.bind(this))
            .then(function (response) {
                var contentType = response.headers.get("content-type") || "";

                if (contentType.indexOf("application/json") > -1) {
                    return response.json();
                }

                return response.text();
            });
    };

    WebformPlugin.prototype.handleSubmit = function (event) {
        var submission;
        var allValid = true;
        var firstInvalidEntry = null;

        event.preventDefault();
        this.clearErrors();

        this.fieldEntries.forEach(function (entry) {
            if (!this.validateField(entry)) {
                allValid = false;
                if (!firstInvalidEntry) {
                    firstInvalidEntry = entry;
                }
            }
        }, this);

        if (!allValid) {
            if (firstInvalidEntry) {
                this.getEntryInputElements(firstInvalidEntry)[0].focus();
            }
            return;
        }

        submission = this.getPayload();
        this.submitButton.disabled = true;
        this.submitButton.textContent = this.options.loadingLabel;

        Promise.resolve(
            typeof this.options.onSubmit === "function"
                ? this.options.onSubmit(submission, this)
                : this.options.endpoint
                    ? this.submitWithEndpoint(submission)
                    : { ok: true, message: this.options.successMessage }
        )
            .then(function (response) {
                var ok = response === false ? false : (typeof response === "object" && response && Object.prototype.hasOwnProperty.call(response, "ok") ? response.ok : true);

                if (!ok) {
                    throw new Error(response && response.message ? response.message : this.options.errorMessage);
                }

                this.showStatus(response && response.message ? response.message : this.options.successMessage, "success");

                if (this.options.resetOnSuccess) {
                    this.reset();
                }
            }.bind(this))
            .catch(function (error) {
                this.showStatus(error && error.message ? error.message : this.options.errorMessage, "error");
            }.bind(this))
            .finally(function () {
                this.submitButton.disabled = false;
                this.submitButton.textContent = this.options.submitLabel;
            }.bind(this));
    };

    window.WebformPlugin = WebformPlugin;
})(window, document);
