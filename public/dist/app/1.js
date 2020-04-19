(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./app/_element/_button/_rippleButton/blockButton/blockButton.css":
/*!************************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/blockButton/blockButton.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!./blockButton.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/blockButton/blockButton.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_button/_rippleButton/blockButton/blockButton.pug":
/*!************************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/blockButton/blockButton.pug ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/_button/_rippleButton/blockButton/blockButton.ts":
/*!***********************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/blockButton/blockButton.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlockButton; });
/* harmony import */ var _rippleButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rippleButton */ "./app/_element/_button/_rippleButton/rippleButton.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_1__);


class BlockButton extends _rippleButton__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(content = "", activationCallback) {
        super();
        this.textElem = ce("button-text");
        this.spinner = ce("loading-spinner");
        this.textContainer = ce("button-container");
        this.activationCallbackIndex = new Map();
        if (activationCallback)
            this.addActivationCallback(activationCallback);
        this.content(content);
        this.apd(this.spinner).apd(this.textContainer.apd(this.textElem));
    }
    addActivationCallback(activationCallback, animationDoneCb) {
        let inner = async (e) => {
            let res = activationCallback.call(this, e);
            if (res instanceof Promise) {
                this.loading();
                this.disable();
                await res;
                this.doneLoading();
                if (animationDoneCb)
                    await animationDoneCb.call(this, e);
            }
            else if (animationDoneCb)
                await animationDoneCb.call(this, e);
            this.enable();
        };
        super.addActivationCallback(inner);
        this.activationCallbackIndex.set(activationCallback, inner);
    }
    removeActivationCallback(activationCallback) {
        let inner = this.activationCallbackIndex.get(activationCallback);
        if (inner !== undefined) {
            super.removeActivationCallback(inner);
        }
    }
    async loading() {
        let proms = [];
        delay__WEBPACK_IMPORTED_MODULE_1___default()(100).then(() => {
            proms.add(this.spinner.anim([
                { opacity: 0, offset: 0 },
                { opacity: 1 }
            ], 400));
            this.spinner.anim([
                { rotateZ: 0, offset: 0 },
                { rotateZ: 360 }
            ], { duration: 1000, iterations: Infinity, easing: "linear" });
        }),
            proms.add(this.textContainer.anim({ translateX: 6 }, 400));
        await Promise.all(proms);
    }
    async doneLoading() {
        await Promise.all([
            this.spinner.anim({ opacity: 0 }).then(() => this.spinner.anim({ rotateZ: 0 })),
            this.textContainer.anim({ translateX: .1 }, 400)
        ]);
    }
    content(to) {
        this.textElem.text(to);
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./blockButton.css */ "./app/_element/_button/_rippleButton/blockButton/blockButton.css").toString();
    }
    pug() {
        return super.pug() + __webpack_require__(/*! ./blockButton.pug */ "./app/_element/_button/_rippleButton/blockButton/blockButton.pug").default;
    }
}
window.customElements.define('c-block-button', BlockButton);


/***/ }),

/***/ "./app/_element/_button/_rippleButton/rippleButton.css":
/*!*************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/rippleButton.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./rippleButton.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/rippleButton.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_button/_rippleButton/rippleButton.pug":
/*!*************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/rippleButton.pug ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/_button/_rippleButton/rippleButton.ts":
/*!************************************************************!*\
  !*** ./app/_element/_button/_rippleButton/rippleButton.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RippleButton; });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../button */ "./app/_element/_button/button.ts");

class RippleButton extends _button__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(activationCallback, enabled, focusOnHover, tabIndex) {
        super(enabled, focusOnHover, tabIndex);
        super.addActivationCallback((e) => {
            this.initRipple(e);
        });
        super.addActivationCallback(activationCallback);
        this.wave = ce("button-wave");
        this.ripples = ce("button-waves");
        this.apd(this.ripples);
    }
    initRipple(e) {
        let r = this.wave.cloneNode();
        this.ripples.append(r);
        let fadeAnim = async () => {
            try {
                await r.anim({ opacity: 0 }, { duration: 400 });
            }
            catch (error) {
            }
            r.remove();
        };
        let fadeisok = () => {
            if (rdyToFade)
                fadeAnim();
            else
                rdyToFade = true;
        };
        let x;
        let y;
        if (e instanceof MouseEvent) {
            let offset = this.absoluteOffset();
            x = e.pageX - offset.left - r.width() / 2;
            y = e.pageY - offset.top - r.height() / 2;
            this.on("mouseup", fadeisok, { once: true });
            this.on("mouseout", fadeisok, { once: true });
        }
        else {
            x = this.width() / 2 - r.width() / 2;
            y = this.height() / 2 - r.height() / 2;
            //fadeOut
            this.on("keyup", fadeisok, { once: true });
            this.on("blur", fadeisok, { once: true });
        }
        r.css({
            marginTop: y,
            marginLeft: x
        });
        let rdyToFade = false;
        r.anim([{ transform: "scale(0)", offset: 0 }, { transform: "scale(" + (this.width() / 25 * 2.2) + ")" }], { duration: 350, easing: "linear" }).then(fadeisok);
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./rippleButton.css */ "./app/_element/_button/_rippleButton/rippleButton.css").toString();
    }
    pug() {
        return super.pug() + __webpack_require__(/*! ./rippleButton.pug */ "./app/_element/_button/_rippleButton/rippleButton.pug").default;
    }
}


/***/ }),

/***/ "./app/_element/_button/button.css":
/*!*****************************************!*\
  !*** ./app/_element/_button/button.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./button.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/button.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_button/button.pug":
/*!*****************************************!*\
  !*** ./app/_element/_button/button.pug ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/_button/button.ts":
/*!****************************************!*\
  !*** ./app/_element/_button/button.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");

const pressedClass = "pressed";
class Button extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(enabled = true, focusOnHover = false, tabIndex = 0, obtainDefault = false, preventFocus = false, blurOnMouseOut = false, hotkey) {
        super(false);
        this.enabled = enabled;
        this.tabIndex = tabIndex;
        this.obtainDefault = obtainDefault;
        this.preventFocus = preventFocus;
        this.callbacks = [];
        if (enabled)
            this.enableForce(true);
        else
            this.enableForce(true);
        this.preferedTabIndex = this.tabIndex;
        let alreadyPressed = false;
        this.on("mousedown", (e) => {
            if (e.which === 1)
                this.click(e);
        });
        this.on("mouseup", () => {
            this.removeClass(pressedClass);
        });
        this.on("mouseout", () => {
            this.removeClass(pressedClass);
        });
        this.on("keydown", (e) => {
            if (e.key === " " || e.key === "Enter")
                if (!alreadyPressed) {
                    alreadyPressed = true;
                    this.click(e);
                }
        });
        this.on("keyup", ({ key }) => {
            if (key === " " || key === "Enter") {
                alreadyPressed = false;
                this.removeClass(pressedClass);
            }
        });
        this.on("blur", () => {
            alreadyPressed = false;
        });
        this.mouseOverListener = this.ls("mouseover", () => {
            this.focus();
        }, false);
        this.mouseOutListener = this.ls("mouseout", () => {
            this.blur();
        }, false);
        this.focusOnHover = focusOnHover;
        this.blurOnMouseOut = blurOnMouseOut;
        this.hotkey = hotkey;
    }
    enableForce(prevFocus) {
        //@ts-ignore
        this.enabled = true;
        this.tabIndex = this.preferedTabIndex;
        this.addClass("enabled");
        if (!prevFocus)
            this.focus();
    }
    enable(prevFocus = true) {
        if (this.enabled)
            return;
        this.enableForce(prevFocus);
    }
    disableForce(prevBlur) {
        //@ts-ignore
        this.enabled = false;
        this.tabIndex = undefined;
        this.removeClass("enabled");
        if (!prevBlur)
            this.blur();
    }
    disable(prevBlur = false) {
        if (!this.enabled)
            return;
        this.disableForce(prevBlur);
    }
    set blurOnMouseOut(to) {
        if (to)
            this.mouseOutListener.enable();
        else
            this.mouseOutListener.disable();
    }
    addActivationCallback(cb) {
        if (cb !== undefined)
            this.callbacks.add(cb);
    }
    removeActivationCallback(cb) {
        if (cb !== undefined)
            this.callbacks.removeV(cb);
    }
    set focusOnHover(to) {
        this.doesFocusOnHover = to;
        if (to) {
            this.mouseOverListener.enable();
            this.mouseOutListener.enable();
        }
        else {
            this.mouseOverListener.disable();
            this.mouseOutListener.disable();
        }
    }
    get focusOnHover() {
        return this.doesFocusOnHover;
    }
    click(e) {
        if (e !== undefined && !this.obtainDefault)
            e.preventDefault();
        if (this.enabled) {
            if (!this.preventFocus)
                this.focus();
            this.addClass(pressedClass);
            this.callbacks.forEach(f => { f.call(this, e); });
        }
    }
    set hotkey(to) {
        if (to === undefined) {
            if (this._hotKey !== undefined) {
                document.off("keydown", this.hotKeyListener);
                delete this.hotKeyListener;
            }
        }
        else if (this._hotKey === undefined) {
            this.hotKeyListener = (e) => {
                if (this.offsetParent !== null)
                    if (e.key === this._hotKey)
                        this.click();
            };
            document.on("keydown", this.hotKeyListener);
        }
        this._hotKey = to;
    }
    get hotkey() {
        return this._hotKey;
    }
    stl() {
        return __webpack_require__(/*! ./button.css */ "./app/_element/_button/button.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./button.pug */ "./app/_element/_button/button.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-button', Button);


/***/ }),

/***/ "./app/_element/_panel/eduPanel/eduPanel.css":
/*!***************************************************!*\
  !*** ./app/_element/_panel/eduPanel/eduPanel.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./eduPanel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/eduPanel/eduPanel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/eduPanel/eduPanel.pug":
/*!***************************************************!*\
  !*** ./app/_element/_panel/eduPanel/eduPanel.pug ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<main-conatiner><hours-container> </hours-container><loading-bar><loading-progress></loading-progress></loading-bar><scroll-conatiner class=\"cards\"><other-cards-container></other-cards-container></scroll-conatiner><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"9.72\" viewbox=\"0 0 17 9.72\" id=\"arrow\"><path id=\"Union_8\" data-name=\"Union 8\" d=\"M1244.123-8311.8l-.181.184-7.289-7.289.36-.363,7.106,7.1,7.171-7.172.363.363-7.354,7.352Z\" transform=\"translate(-1235.653 8320.341)\" fill=\"none\" stroke=\"#7a7a7a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"></path></svg></main-conatiner><black-bar></black-bar><list-conatiner><scroll-conatiner class=\"table\"><table-root></table-root></scroll-conatiner></list-conatiner>");

/***/ }),

/***/ "./app/_element/_panel/eduPanel/eduPanel.ts":
/*!**************************************************!*\
  !*** ./app/_element/_panel/eduPanel/eduPanel.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EduPanel; });
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../panel */ "./app/_element/_panel/panel.ts");
/* harmony import */ var _edu_edu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../edu/edu */ "./app/_element/edu/edu.ts");
/* harmony import */ var extended_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! extended-dom */ "./node_modules/extended-dom/app/dist/edom.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var waapi_easing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! waapi-easing */ "./node_modules/waapi-easing/app/dist/waapiEasing.js");
/* harmony import */ var front_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! front-db */ "./node_modules/front-db/app/dist/f-db.js");
/* harmony import */ var _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_button/_rippleButton/blockButton/blockButton */ "./app/_element/_button/_rippleButton/blockButton/blockButton.ts");
/* harmony import */ var animated_scroll_to__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! animated-scroll-to */ "./node_modules/animated-scroll-to/lib/animated-scroll-to.js");
/* harmony import */ var animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(animated_scroll_to__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_ajax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../lib/ajax */ "./app/lib/ajax.ts");
/* harmony import */ var _lib_cardReader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/cardReader */ "./app/lib/cardReader.ts");
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! crypto-js/sha256 */ "./node_modules/crypto-js/sha256.js");
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256__WEBPACK_IMPORTED_MODULE_10__);











let easing = new waapi_easing__WEBPACK_IMPORTED_MODULE_4__["default"](0.485, 0.010, 0.155, 1);
function getCurrentHour() {
    let date = new Date();
    let h = date.getHours();
    let min = date.getMinutes();
    if (min > 30)
        h++;
    return h;
}
const knownLogins = {
    student: {},
    teacher: {}
};
const teacherString = "teacher";
const studentString = "student";
const employeeTypeString = "employeeType";
setTimeout(async () => {
    let res = await _lib_ajax__WEBPACK_IMPORTED_MODULE_8__["default"].get("cardIndex", true);
    for (let key in res.student) {
        if (!knownLogins.student[key]) {
            knownLogins.student[key] = res.student[key];
            knownLogins.student[key][employeeTypeString] = studentString;
        }
    }
    for (let key in res.teacher) {
        if (!knownLogins.teacher[key]) {
            knownLogins.teacher[key] = res.teacher[key];
            knownLogins.teacher[key][employeeTypeString] = teacherString;
        }
    }
}, 0);
class EduPanel extends _panel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(manager, list, eduExpectedChangeCb) {
        super();
        this.manager = manager;
        this.list = list;
        this.eduExpectedChangeCb = eduExpectedChangeCb;
        this.mainBody = this.q("main-conatiner");
        this.hoursContainer = this.q("hours-container");
        this.otherCardsContainer = this.q("other-cards-container").first;
        this.cardsContainer = this.q("scroll-conatiner.cards").first;
        this.tableContainer = this.q("scroll-conatiner.table").first;
        this.tableRoot = this.q("table-root").first;
        this.arrow = this.q("#arrow").first;
        this.currentlyShowingConfirmOptions = false;
        this.buttonLoadingCbs = [];
        this.showHrsCancled = false;
        this.showingHours = false;
        this.alreadyCanc = false;
        this.activeTeacherSession = false;
        this.subject = "Unknown";
        this.maxHours = 0;
        this.loadingBar = this.q("loading-bar");
        this.loadingProgress = this.loadingBar.childs("loading-progress");
        window.addEventListener("offline", async () => {
            if (!this.currentlyShowingConfirmOptions)
                if (this.expectedCard === "student")
                    this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.");
        });
        window.addEventListener("online", async () => {
            if (this.expectedCard === "student")
                this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.");
        });
        this.arrow.on("mousedown", async (e) => {
            if (this.arrow.css("opacity") === 1)
                await animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()(350, {
                    elementToScroll: this.cardsContainer,
                    speed: 2000
                });
        });
        this.cancButton = new _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_6__["default"]("Abort");
        this.cancButton.hotkey = "Escape";
        this.cancButton.id = "canc";
        this.confButton = new _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_6__["default"]("Confirm");
        this.confButton.id = "conf";
        this.cancButton.disable();
        this.confButton.disable();
        this.buttons = new extended_dom__WEBPACK_IMPORTED_MODULE_2__["ElementList"](this.cancButton, this.confButton);
        const t = this;
        this.buttons.Inner("addActivationCallback", [async function () {
                t.cancButton.disable();
                t.confButton.disable();
                let proms = [delay__WEBPACK_IMPORTED_MODULE_3___default()(600)];
                let conf = this === t.confButton;
                proms.add(t.buttonLoadingCbs.ea(async (cb) => {
                    await cb(conf);
                }));
                await Promise.all(proms);
                t.buttonLoadingCbs.clear();
            }, async function () {
                if (t.currButtonCb)
                    t.currButtonCb(this === t.confButton);
                delete t.currButtonCb;
                await t.hideConfimOptions();
            }]);
        this.mainBody.apd(this.cancButton, this.confButton);
        this.mainCard = new _edu_edu__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.mainCard.id = "mainCard";
        this.cardsContainer.insertBefore(this.mainCard, this.otherCardsContainer);
        let guide = new front_db__WEBPACK_IMPORTED_MODULE_5__["Data"](0);
        let lastPos = 0;
        this.cardsContainer.on("scroll", (e) => {
            let pos = this.cardsContainer.scrollTop;
            guide.val = pos;
            this.cancelShowHours();
            if (lastPos === 0 && pos > 0) {
                if (list.length() !== 0)
                    this.arrow.anim({ opacity: 0 }).then(() => this.arrow.hide());
                if (this.currentlyShowingConfirmOptions)
                    this.hideConfimOptions();
            }
            else if (lastPos > 0 && pos === 0) {
                if (list.length() !== 0)
                    if (this.expectedCard !== "teacher")
                        this.arrow.show().anim({ opacity: 1 });
            }
            lastPos = pos;
        });
        this.otherCardsContainer.anim([{ translateY: 125, offset: 0 }, { translateY: .1 }], { start: 0, end: 300 }, guide);
        list.forEach((e, i) => {
            let edu = new _edu_edu__WEBPACK_IMPORTED_MODULE_1__["default"]();
            edu.css("opacity", 0);
            let currentData = e.current();
            e.get("username", (username) => {
                edu.username(username);
            });
            e.get("fullName", (fullName) => {
                edu.fullName(fullName);
            });
            edu.luckyDay();
            edu.updatePasscode();
            edu.employeeType("Student");
            this.otherCardsContainer.insertBefore(edu, this.otherCardsContainer.childs()[i]);
            edu.anim({ opacity: 1 });
            this.tableRoot.apd(ce("table-col").text(currentData.username.val));
            let entryCol = ce("table-col");
            this.tableRoot.apd(entryCol);
            e.ref("registered").asArray.forEach((reg) => {
                let entryBox = ce("hour-box");
                reg.get("", (e) => {
                    if (e) {
                        entryBox.addClass("active");
                    }
                    else {
                        entryBox.removeClass("active");
                    }
                });
                entryCol.apd(entryBox);
            }, () => {
                entryCol.html("");
            }, () => {
                entryCol.childs().css("opacity", 1);
            });
        }, async () => {
            this.otherCardsContainer.html("");
            this.tableRoot.html("");
        });
        const zoom = .77;
        this.cardsContainer.on("resize", () => {
            this.mainCard.css("marginTop", ((this.cardsContainer.height() - (this.mainCard.height() * zoom)) / 2) / zoom);
        });
    }
    async expectStudent(temporary = false) {
        if (!temporary) {
            this.showScrollDown();
            this.enableTable();
        }
        else {
            this.hideScrollDown();
            this.disableTable();
        }
        if (this.expectedCard === "student")
            return;
        if (this.eduExpectedChangeCb)
            this.eduExpectedChangeCb("student");
        this.mainCard.employeeType("Student");
        this.expectedCard = "student";
        await this.mainCard.expectStudent();
    }
    async expectTeacher() {
        this.expectedCard = "teacher";
        if (this.eduExpectedChangeCb)
            this.eduExpectedChangeCb("teacher");
        if (this.active) {
            await animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()(0, {
                elementToScroll: this.cardsContainer,
                speed: 2000,
                cancelOnUserAction: false
            });
            await delay__WEBPACK_IMPORTED_MODULE_3___default()(100);
        }
        this.hideScrollDown();
        this.disableTable();
        this.mainCard.employeeType("Teacher");
        await this.mainCard.expectTeacher();
    }
    async showScrollDown() {
        if (this.list.length() !== 0) {
            this.arrow.show();
            this.cardsContainer.css("overflowY", "auto");
            await this.arrow.anim({ opacity: 1 }, 500);
        }
    }
    async hideScrollDown() {
        this.cardsContainer.css("overflowY", "hidden");
        await this.arrow.anim({ opacity: 0 }, 500);
        this.arrow.hide();
    }
    async enableTable() {
        this.elementBody.css("overflowX", "auto");
    }
    async disableTable() {
        this.elementBody.css("overflowX", "hidden");
    }
    showConfimOptions(loadingCb) {
        this.buttonLoadingCbs.add(loadingCb);
        if (this.currButtonPromise) {
            return this.currButtonPromise;
        }
        this.currentlyShowingConfirmOptions = true;
        let animProm = (async () => {
            this.elementBody.css("overflowX", "hidden");
            //@ts-ignore
            this.elementBody.css("scrollSnapType", "none");
            await Promise.all([
                animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()(0, {
                    elementToScroll: this.cardsContainer,
                    speed: 2000,
                    cancelOnUserAction: false
                }),
                animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()([0, 0], {
                    elementToScroll: this.elementBody,
                    speed: 1000,
                    cancelOnUserAction: false
                }).then(() => {
                    this.elementBody.css("overflowX", "hidden");
                    //@ts-ignore
                    this.elementBody.css("scrollSnapType", "x mandatory");
                })
            ]);
            this.buttons.Inner("enable", []);
            await this.buttons.show().anim({ opacity: 1 });
        })();
        this.currButtonPromise = new Promise((res) => {
            animProm.then(() => {
                this.currButtonCb = (conf) => {
                    this.elementBody.css("overflowX", "auto");
                    res(conf);
                };
            });
        });
        return this.currButtonPromise;
    }
    async hideConfimOptions() {
        this.currentlyShowingConfirmOptions = false;
        if (this.currButtonCb)
            this.currButtonCb(false);
        this.buttonLoadingCbs.clear();
        delete this.currButtonPromise;
        await this.buttons.anim({ opacity: 0 }).then(() => { this.buttons.hide(); this.buttons.Inner("disable", []); });
    }
    async showHours(data, cardId) {
        this.showingHours = true;
        if (this.cardsContainer.scrollTop !== 0) {
            await animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()(0, {
                elementToScroll: this.cardsContainer,
                speed: 2000,
                cancelOnUserAction: false
            });
            await delay__WEBPACK_IMPORTED_MODULE_3___default()(100);
        }
        let elements = new extended_dom__WEBPACK_IMPORTED_MODULE_2__["ElementList"]();
        for (let i = 0; i < data.registered.length; i++) {
            let hour = ce("hour-box");
            if (data.registered[i] === "active")
                hour.addClass("active");
            else if (data.registered[i] === "gone") { }
            else if (data.registered[i] === "toBeGone")
                hour.addClass("toBeGone");
            elements.add(hour);
            this.hoursContainer.apd(hour);
        }
        if (data.sign === "in") {
            this.list.add({ username: data.username, fullName: data.fullName, registered: data.registered });
            await Promise.all([
                elements.anim({ translateY: 21 }, { duration: 700, easing }),
                elements.anim({ opacity: 1 }, { duration: 700, easing: "linear" }, 100),
                this.mainCard.anim({ translateY: -21 }, { duration: 700, easing })
            ]);
            if (this.showHrsCancled)
                return this.showHrsCancled = false;
            delay__WEBPACK_IMPORTED_MODULE_3___default()(600).then(() => {
                if (this.showHrsCancled)
                    return this.showHrsCancled = false;
                if (this.cardsContainer.scrollTop === 0)
                    this.expectStudent();
            });
            await delay__WEBPACK_IMPORTED_MODULE_3___default()(2500);
            if (this.showHrsCancled)
                return this.showHrsCancled = false;
        }
        else if (data.sign === "out") {
            _lib_cardReader__WEBPACK_IMPORTED_MODULE_9__["disable"]();
            let confirmProm;
            try {
                let logoutAfter = data.registered.length;
                data.registered.ea((e, i) => {
                    if (e === "toBeGone")
                        return logoutAfter = i;
                });
                if (logoutAfter === data.registered.length) {
                    this.manager.panelIndex.info.updateContents("Note", "You will be signed out <text-hightlight>automatically</text-hightlight> after a unit ends.");
                    await Promise.all([
                        elements.anim({ translateY: 21 }, { duration: 700, easing }),
                        elements.anim({ opacity: 1 }, { duration: 700, easing: "linear" }, 100),
                        this.mainCard.anim({ translateY: -21 }, { duration: 700, easing })
                    ]);
                    _lib_cardReader__WEBPACK_IMPORTED_MODULE_9__["enable"]();
                    if (this.showHrsCancled)
                        return this.showHrsCancled = false;
                    await delay__WEBPACK_IMPORTED_MODULE_3___default()(3000);
                    if (this.showHrsCancled)
                        return this.showHrsCancled = false;
                    await Promise.all([
                        this.mainCard.anim({ translateY: .1 }, { duration: 800, easing }),
                        elements.anim({ translateY: .1 }, { duration: 800, easing }).then(() => {
                            elements.remove();
                        })
                    ]);
                    if (this.showHrsCancled)
                        return this.showHrsCancled = false;
                    if (navigator.onLine)
                        this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.");
                    else
                        this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.");
                    return;
                }
                else {
                    let lastPredetermant = 0;
                    data.registered.ea((e, i) => {
                        if (e === "active" || e === "gone")
                            lastPredetermant = i + 1;
                    });
                    let totalActiveSessions = logoutAfter - lastPredetermant;
                    if (totalActiveSessions === 0) {
                        this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out of this unit <text-hightlight>right away</text-hightlight>. Are you sure?");
                    }
                    else if (logoutAfter === 1) {
                        this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out after the <text-hightlight>first hour</text-hightlight>. Are you sure?");
                    }
                    else {
                        this.manager.panelIndex.info.updateContents("Logout", "You are about to sign out after the first <text-hightlight>" + logoutAfter + " hours</text-hightlight>. Are you sure?");
                    }
                }
                confirmProm = this.showConfimOptions((confirm) => {
                    return new Promise(async (resButton) => {
                        if (confirm) {
                            let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_8__["default"].post("studentSignOut", { cardId }, undefined, true);
                            req.fail(() => {
                                let i = -1;
                                this.list.list((e, ind) => {
                                    if (e.current().username.val === data.username)
                                        i = ind;
                                });
                                this.list.removeI(i);
                                _lib_cardReader__WEBPACK_IMPORTED_MODULE_9__["enable"]();
                                resButton();
                            });
                            await req;
                            let i = -1;
                            this.list.list((e, ind) => {
                                if (e.current().username.val === data.username)
                                    i = ind;
                            });
                            this.list.removeI(i);
                            resButton();
                        }
                        else
                            resButton();
                    });
                });
                await Promise.all([
                    elements.anim({ translateY: 21 }, { duration: 700, easing }),
                    elements.anim({ opacity: 1 }, { duration: 700, easing: "linear" }, 100),
                    this.mainCard.anim({ translateY: -21 }, { duration: 700, easing }),
                    confirmProm
                ]);
            }
            catch (e) {
            }
            _lib_cardReader__WEBPACK_IMPORTED_MODULE_9__["enable"]();
            if (navigator.onLine)
                this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.");
            else
                this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.");
            let confirm = await confirmProm;
            if (this.showHrsCancled)
                return this.showHrsCancled = false;
            if (confirm) {
                await this.hoursContainer.childs(".toBeGone").anim({ background: "#D9D9D9" }, 400, 50);
                await delay__WEBPACK_IMPORTED_MODULE_3___default()(300);
                data.registered.ea((e, i) => {
                    if (e === "toBeGone")
                        data.registered[i] = "gone";
                });
            }
            else {
                await this.hoursContainer.childs(".toBeGone").anim({ background: "#79C865" }, 400, 50);
                await delay__WEBPACK_IMPORTED_MODULE_3___default()(300);
                data.registered.ea((e, i) => {
                    if (e === "active")
                        data.registered[i] = "gone";
                });
            }
            if (this.showHrsCancled)
                return this.showHrsCancled = false;
            delay__WEBPACK_IMPORTED_MODULE_3___default()(600).then(() => {
                if (this.showHrsCancled)
                    return this.showHrsCancled = false;
                if (this.cardsContainer.scrollTop === 0 && this.list.length() !== 0)
                    this.expectStudent();
                else
                    this.hideScrollDown();
            });
        }
        elements = this.hoursContainer.childs();
        await Promise.all([
            this.mainCard.anim({ translateY: .1 }, { duration: 800, easing }),
            elements.anim({ translateY: .1 }, { duration: 800, easing }).then(() => {
                elements.remove();
            })
        ]);
        this.mainCard.username("");
        this.mainCard.fullName("Unknown");
        this.mainCard.clearLuckyDay();
        this.mainCard.updatePasscode(0);
        this.showingHours = false;
        this.showHrsCancled = false;
    }
    async cancelShowHours() {
        if (this.alreadyCanc || !this.showingHours)
            return;
        this.alreadyCanc = true;
        this.showHrsCancled = true;
        let elements = this.hoursContainer.childs();
        this.mainCard.username("");
        this.mainCard.fullName("Unknown");
        this.mainCard.clearLuckyDay();
        this.mainCard.updatePasscode(0);
        if (navigator.onLine)
            this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.");
        else
            this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.");
        await Promise.all([
            this.mainCard.anim({ translateY: .1 }, { duration: 200, easing }),
            elements.anim({ opacity: 0 }, { duration: 100, easing }).then(() => elements.hide())
        ]);
        this.showingHours = false;
        this.alreadyCanc = false;
    }
    async registerRequest(data, encryptedCardId) {
        let expectedUser = this.expectedCard;
        if (data.employeeType === "teacher") {
            // got user teacher
            if (!knownLogins.teacher[encryptedCardId]) {
                knownLogins.teacher[encryptedCardId] = data;
            }
            this.mainCard.username(data.username);
            this.mainCard.fullName(data.fullName);
            this.mainCard.luckyDay();
            this.mainCard.updatePasscode();
            await this.expectTeacher();
            if (expectedUser === "teacher") {
                // expected and got teacher
                if (!this.activeTeacherSession) {
                    // Teacher start session
                    this.activeTeacherSession = true;
                    if (data.sessKey !== undefined)
                        localStorage.sessKey = data.sessKey;
                    await this.loadingTeacherAnimation();
                    this.manager.setPanel("setUpPanel", "left");
                    this.manager.setPanel("setUpConfirmationPanel", "right");
                    delay__WEBPACK_IMPORTED_MODULE_3___default()(250).then(() => {
                        this.clearMainCard();
                    });
                }
                else {
                    // double login teacher
                    await this.logoutTeacherAction();
                }
            }
            else {
                // expected student but got teacher
                await this.logoutTeacherAction();
            }
        }
        else {
            // Got user student
            if (!knownLogins.student[encryptedCardId]) {
                data.startOfLastUnit = getCurrentHour();
                knownLogins.student[encryptedCardId] = data;
            }
            this.mainCard.username(data.username);
            this.mainCard.fullName(data.fullName);
            this.mainCard.luckyDay();
            this.mainCard.updatePasscode();
            if (expectedUser === "student") {
                // got and expected student 
                this.showHours(data, encryptedCardId);
            }
            else {
                // expected teacher but got student
                await this.expectStudent(true);
                await this.mainCard.anim({
                    translateX: [6, -6, 5, -5, 4, -4, 3, -3, 2, -2, 1, -1, 0]
                }, { duration: 1400, easing });
                this.mainCard.username("");
                this.mainCard.fullName("Unknown");
                this.mainCard.clearLuckyDay();
                this.mainCard.updatePasscode(0);
                await this.expectTeacher();
            }
        }
    }
    cardReadCallback(cardId) {
        let encryptedCardId = crypto_js_sha256__WEBPACK_IMPORTED_MODULE_10___default()(cardId).toString();
        return new Promise(async (resCardReadCallback) => {
            await this.cancelShowHours();
            await animated_scroll_to__WEBPACK_IMPORTED_MODULE_7___default()(0, {
                elementToScroll: this.cardsContainer,
                speed: 2000,
                cancelOnUserAction: false
            });
            this.hideScrollDown();
            this.mainCard.authentication();
            let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_8__["default"].post("cardAuth", {
                encryptedCardId
            }, undefined);
            req.fail(async () => {
                await delay__WEBPACK_IMPORTED_MODULE_3___default()(1200);
                let cardKnownAsStudent = !!knownLogins.student[encryptedCardId];
                let cardKnownAsTeacher = !!knownLogins.teacher[encryptedCardId];
                this.mainCard.doneAuthentication();
                if (this.expectedCard === "teacher") {
                    if (cardKnownAsTeacher) {
                        req.recall().then((res) => {
                            if (res.data.sessKey)
                                localStorage.sessKey = res.data.sessKey;
                        });
                    }
                    if (cardKnownAsStudent || cardKnownAsTeacher)
                        await this.registerRequest(knownLogins.teacher[encryptedCardId], encryptedCardId);
                }
                else if (this.expectedCard === "student") {
                    let recallRequest = req.recall();
                    // Student
                    if (cardKnownAsStudent) {
                        let data = knownLogins.student[encryptedCardId];
                        let regDef = data.registered !== undefined;
                        let firstInactivefieldAtTheEnd = 0;
                        if (regDef) {
                            data.registered.Reverse().ea((e, i) => {
                                if (e !== "gone")
                                    return firstInactivefieldAtTheEnd = data.registered.length - i;
                            });
                        }
                        if (regDef && data.startOfLastUnit !== undefined && firstInactivefieldAtTheEnd === data.registered.length) {
                            let currTime = getCurrentHour();
                            if (data.startOfLastUnit <= currTime) {
                                data.sign = "out";
                                recallRequest.abort();
                                let timeDelta = currTime - data.startOfLastUnit;
                                for (let i = timeDelta; i < data.registered.length; i++) {
                                    data.registered[i] = "toBeGone";
                                }
                            }
                            else {
                                this.mainCard.fullName("Unexpected Error");
                                await delay__WEBPACK_IMPORTED_MODULE_3___default()(2000);
                                this.mainCard.fullName("Unknown");
                                return false;
                            }
                        }
                        else {
                            data.sign = "in";
                            data.registered = [];
                            for (let i = 0; i < this.maxHours; i++) {
                                data.registered[i] = "active";
                            }
                        }
                        await this.registerRequest(data, encryptedCardId);
                    }
                    else
                        recallRequest.abort();
                    // Teacher
                    if (cardKnownAsTeacher) {
                        recallRequest.abort();
                        await this.registerRequest(knownLogins.teacher[encryptedCardId], encryptedCardId);
                    }
                    else
                        recallRequest.abort();
                }
                if (!cardKnownAsStudent && !cardKnownAsTeacher) {
                    this.mainCard.fullName("Unable to authenticate");
                    await delay__WEBPACK_IMPORTED_MODULE_3___default()(2000);
                    this.mainCard.fullName("Unknown");
                }
                resCardReadCallback();
            });
            await Promise.all([req, delay__WEBPACK_IMPORTED_MODULE_3___default()(1000 + (Math.random() * 1000))]);
            let res = await req;
            this.mainCard.doneAuthentication();
            if (res.entry) {
                await this.registerRequest(res.data, encryptedCardId);
            }
            else {
                this.manager.panelIndex.login.encryptedCardId = encryptedCardId;
                this.manager.setPanel("login", "left");
                this.mainCard.fullName("Unknown");
            }
            if (this.expectedCard === "student")
                this.showScrollDown();
            resCardReadCallback();
        });
    }
    async logoutTeacherAction() {
        this.manager.panelIndex.info.updateContents("Logout", "You are about to log out of, hence terminate this session. Are you sure?");
        let confirm = await this.showConfimOptions((confirm) => {
            return new Promise(async (resButton) => {
                if (confirm) {
                    let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_8__["default"].post("destroySession", {}, undefined, true);
                    req.fail(() => {
                        while (this.list.length()) {
                            this.list.removeI(0);
                        }
                        for (let key in knownLogins.student) {
                            delete knownLogins.student[key].registered;
                            delete knownLogins.student[key].startOfLastUnit;
                        }
                        resButton();
                    });
                    await req;
                    while (this.list.length()) {
                        this.list.removeI(0);
                    }
                    for (let key in knownLogins.student) {
                        delete knownLogins.student[key].registered;
                        delete knownLogins.student[key].startOfLastUnit;
                    }
                    resButton();
                }
                else
                    resButton();
            });
        });
        if (confirm) {
            delete localStorage.sessKey;
            this.activeTeacherSession = false;
            clearTimeout(this.manager.panelIndex.setUpConfirmationPanel.destroySessionTimeout);
            this.clearMainCard();
            this.manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.");
        }
        else {
            this.clearMainCard();
            await this.expectStudent();
            if (navigator.onLine)
                this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. To sign out, register your card again.");
            else
                this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + this.subject + "</text-hightlight> here. Your card will be synced when online.");
        }
    }
    clearMainCard(expected = this.expectedCard) {
        this.mainCard.username("");
        this.mainCard.updatePasscode(0);
        this.mainCard.clearLuckyDay();
        this.mainCard.employeeType(expected);
        this.mainCard.fullName("Unknown");
    }
    async loadingTeacherAnimation() {
        this.loadingBar.css("opacity", 1);
        let prom = Promise.all([
            Promise.all([
                this.loadingBar.anim({ translateY: 85 }, { duration: 900, easing }),
                this.loadingBar.anim({ opacity: 1 }, { duration: 900, easing: "linear" }, 100),
                this.mainCard.anim({ translateY: -21 }, { duration: 900, easing })
            ]),
            delay__WEBPACK_IMPORTED_MODULE_3___default()(550).then(() => Promise.all([
                this.loadingProgress.anim([
                    { width: "30%", offset: .3 },
                    { width: "40%", offset: .555 },
                    { width: "74%", offset: .8 },
                    { width: "100%" }
                ], { duration: 1700 }),
                delay__WEBPACK_IMPORTED_MODULE_3___default()(50)
            ]))
        ]);
        prom.then(() => {
            this.loadingBar.anim({ translateY: 85 }, { duration: 900, easing }).then(() => {
                this.loadingBar.css("opacity", 0);
                this.loadingProgress.css("width", "0%");
            });
            this.mainCard.anim({ translateY: .1 }, { duration: 900, easing });
        });
        await prom;
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./eduPanel.css */ "./app/_element/_panel/eduPanel/eduPanel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./eduPanel.pug */ "./app/_element/_panel/eduPanel/eduPanel.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-edu-panel', EduPanel);


/***/ }),

/***/ "./app/_element/_panel/informPanel/informPanel.css":
/*!*********************************************************!*\
  !*** ./app/_element/_panel/informPanel/informPanel.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./informPanel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/informPanel/informPanel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/informPanel/informPanel.pug":
/*!*********************************************************!*\
  !*** ./app/_element/_panel/informPanel/informPanel.pug ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<text-conatiner> <text-heading></text-heading><text-paragraph></text-paragraph><bottom-stripe></bottom-stripe></text-conatiner>");

/***/ }),

/***/ "./app/_element/_panel/informPanel/informPanel.ts":
/*!********************************************************!*\
  !*** ./app/_element/_panel/informPanel/informPanel.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InformPanel; });
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../panel */ "./app/_element/_panel/panel.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_1__);


class InformPanel extends _panel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(manager, heading, content) {
        super();
        this.preferedWidth = "small";
        this.headingElem = this.q("text-heading").first;
        this.contentElem = this.q("text-paragraph").first;
        this.updateContents(heading, content);
    }
    async updateContents(heading, content) {
        let proms = [];
        if (heading !== this.headingElem.html()) {
            proms.add(this.forceHeading(heading));
            if (content !== this.contentElem.html())
                proms.add(delay__WEBPACK_IMPORTED_MODULE_1___default()(30).then(() => this.forceContent(content)));
        }
        else {
            if (content !== this.contentElem.html())
                proms.add(this.forceContent(content));
        }
        await Promise.all(proms);
    }
    async heading(to) {
        if (to === this.headingElem.html())
            return;
        await this.forceHeading(to);
    }
    async content(to) {
        if (to === this.contentElem.html())
            return;
        await this.forceContent(to);
    }
    async forceHeading(to) {
        await this.headingElem.anim({ opacity: 0, translateX: 3 });
        this.headingElem.css({ translateX: -3 });
        this.headingElem.html(to);
        await this.headingElem.anim({ opacity: 1, translateX: 0.1 });
    }
    async forceContent(to) {
        await this.contentElem.anim({ opacity: 0, translateX: 3 });
        this.contentElem.css({ translateX: -3 });
        this.contentElem.html(to);
        await this.contentElem.anim({ opacity: 1, translateX: 0.1 });
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./informPanel.css */ "./app/_element/_panel/informPanel/informPanel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./informPanel.pug */ "./app/_element/_panel/informPanel/informPanel.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-inform-panel', InformPanel);


/***/ }),

/***/ "./app/_element/_panel/loginPanel/loginPanel.css":
/*!*******************************************************!*\
  !*** ./app/_element/_panel/loginPanel/loginPanel.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./loginPanel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/loginPanel/loginPanel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/loginPanel/loginPanel.pug":
/*!*******************************************************!*\
  !*** ./app/_element/_panel/loginPanel/loginPanel.pug ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<text-conatiner> <text-heading>Login</text-heading><c-input placeholder=\"Username\"></c-input><c-input placeholder=\"Password\" type=\"password\"></c-input></text-conatiner>");

/***/ }),

/***/ "./app/_element/_panel/loginPanel/loginPanel.ts":
/*!******************************************************!*\
  !*** ./app/_element/_panel/loginPanel/loginPanel.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginPanel; });
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../panel */ "./app/_element/_panel/panel.ts");
/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../input/input */ "./app/_element/input/input.ts");
/* harmony import */ var _lib_ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/ajax */ "./app/lib/ajax.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_cardReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/cardReader */ "./app/lib/cardReader.ts");





class LoginPanel extends _panel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(manager) {
        super();
        this.manager = manager;
        this.preferedWidth = "small";
        this.preventFocusInterference = true;
        this.inputs = this.q("c-input");
        this.usr = this.inputs.first;
        this.pwd = this.inputs[1];
        this.encryptedCardId = "";
        let invalid = false;
        let submitCb = async () => {
            this.inputs.Inner("disable", []);
            manager.panelIndex.edu.mainCard.authentication();
            let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_2__["default"].post("LDAPAuth", { username: this.usr.value, password: this.pwd.value });
            req.fail(async () => {
                manager.panelIndex.edu.mainCard.doneAuthentication();
                await manager.setPanel("info", "left");
                this.inputs.Inner("enable", []);
            });
            await Promise.all([req, delay__WEBPACK_IMPORTED_MODULE_3___default()(1000 + (Math.random() * 1000))]);
            manager.panelIndex.edu.mainCard.doneAuthentication();
            let res = await req;
            if (res.valid) {
                Object(_lib_cardReader__WEBPACK_IMPORTED_MODULE_4__["disable"])();
                manager.panelIndex.edu.registerRequest(res.data, this.encryptedCardId).then(() => {
                    Object(_lib_cardReader__WEBPACK_IMPORTED_MODULE_4__["enable"])();
                });
                await manager.setPanel("info", "left");
                this.inputs.ea((input) => {
                    input.value = "";
                });
                this.inputs.Inner("enable", []);
            }
            else {
                this.inputs.Inner("showInvalidation", ["Username or password is incorrect."]);
                this.inputs.Inner("enable", []);
                invalid = true;
                manager.panelIndex.edu.mainCard.fullName("Authentication failed");
            }
        };
        this.inputs.Inner("onInput", [() => {
                if (invalid) {
                    this.inputs.Inner("showInvalidation", [false]);
                    invalid = false;
                    manager.panelIndex.edu.mainCard.fullName("Unknown");
                }
            }]);
        this.inputs.ea((input) => {
            input.submitCallback = submitCb;
        });
        this.usr.onInput((v) => {
            manager.panelIndex.edu.mainCard.username(v);
        });
        this.pwd.onInput((v) => {
            manager.panelIndex.edu.mainCard.updatePasscode(v.length);
        });
    }
    activationCallback() {
        super.activationCallback();
        this.usr.focus();
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./loginPanel.css */ "./app/_element/_panel/loginPanel/loginPanel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./loginPanel.pug */ "./app/_element/_panel/loginPanel/loginPanel.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-login-panel', LoginPanel);


/***/ }),

/***/ "./app/_element/_panel/panel.css":
/*!***************************************!*\
  !*** ./app/_element/_panel/panel.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./panel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/panel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/panel.pug":
/*!***************************************!*\
  !*** ./app/_element/_panel/panel.pug ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/_panel/panel.ts":
/*!**************************************!*\
  !*** ./app/_element/_panel/panel.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Panel; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var _lib_cardReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/cardReader */ "./app/lib/cardReader.ts");


class Panel extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this.preventFocusInterference = false;
        if (this.cardReadCallback !== defaultCardReadCallback) {
            _lib_cardReader__WEBPACK_IMPORTED_MODULE_1__["addListener"](this.cardReadCallback.bind(this));
            this.wantsCardReader = true;
        }
        else
            this.wantsCardReader = false;
    }
    activate() {
        this.activationCallback();
    }
    deactivate() {
        this.deactivationCallback();
    }
    vate(activate) {
        if (activate)
            this.activate();
        else
            this.deactivate();
    }
    activationCallback() {
    }
    deactivationCallback() {
    }
    cardReadCallback(cardId) {
    }
    stl() {
        return __webpack_require__(/*! ./panel.css */ "./app/_element/_panel/panel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./panel.pug */ "./app/_element/_panel/panel.pug").default;
    }
}
//@ts-ignore
let defaultCardReadCallback = Panel.prototype.cardReadCallback = function (cardId) {
};
//@ts-ignore
window.customElements.define('c-panel', Panel);


/***/ }),

/***/ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css":
/*!*******************************************************************************!*\
  !*** ./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./setUpConfirmationPanel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.pug":
/*!*******************************************************************************!*\
  !*** ./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.pug ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<text-conatiner><text-heading>Confirm</text-heading><text-content>I am currently teaching <subject-text class=\"hightlight\" style=\"max-width: 83px\">no subject</subject-text> in <classroom-text class=\"hightlight\" style=\"max-width: 105px\">no classroom</classroom-text> for <hours-text class=\"hightlight\" style=\"min-width: 11px; max-width: 50px\">0</hours-text> hours.</text-content></text-conatiner>");

/***/ }),

/***/ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.ts":
/*!******************************************************************************!*\
  !*** ./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SetUpConfirmationPanel; });
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../panel */ "./app/_element/_panel/panel.ts");
/* harmony import */ var _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_button/_rippleButton/blockButton/blockButton */ "./app/_element/_button/_rippleButton/blockButton/blockButton.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/ajax */ "./app/lib/ajax.ts");




class SetUpConfirmationPanel extends _panel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(manager) {
        super();
        this.preferedWidth = 20;
        this.subjectElem = this.q("subject-text").first;
        this.classRoomElem = this.q("classroom-text").first;
        this.hoursElem = this.q("hours-text").first;
        this.subjectOK = false;
        this.classroomOK = false;
        this.hoursOK = false;
        this.abortButton = new _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_1__["default"]("Abort").addClass("abort");
        this.abortButton.hotkey = "Escape";
        this.confirmButton = new _button_rippleButton_blockButton_blockButton__WEBPACK_IMPORTED_MODULE_1__["default"]("Sure").addClass("confirm");
        this.abortButton.addActivationCallback(() => {
            return new Promise(async (resButton) => {
                this.confirmButton.disable();
                let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_3__["default"].post("destroySession", {}, undefined, true);
                req.fail(() => {
                    delete localStorage.sessKey;
                    manager.panelIndex.edu.activeTeacherSession = false;
                    delay__WEBPACK_IMPORTED_MODULE_2___default()(500).then(resButton);
                });
                await Promise.all([delay__WEBPACK_IMPORTED_MODULE_2___default()(600), req]);
                delete localStorage.sessKey;
                manager.panelIndex.edu.activeTeacherSession = false;
                resButton();
            });
        }, () => {
            manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.");
            manager.panelIndex.edu.expectTeacher();
            manager.setPanel("info", "left");
            manager.setPanel("edu", "right").then(() => {
                this.confirmButton.enable();
                manager.panelIndex.setUpPanel.resetInputs();
            });
        });
        this.confirmButton.addActivationCallback(() => {
            return new Promise(async (resButton) => {
                this.abortButton.disable();
                let hours = +this.hoursElem.text();
                let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_3__["default"].post("startUnit", {
                    hours,
                    subject: this.subjectElem.text(),
                    classroom: this.classRoomElem.text()
                }, undefined, true);
                req.fail(() => {
                    delay__WEBPACK_IMPORTED_MODULE_2___default()(500).then(resButton);
                    this.destroySessionTimeout = setTimeout(async () => {
                        let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_3__["default"].post("destroySession", {}, undefined, true);
                        manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.");
                        manager.panelIndex.edu.expectTeacher();
                        manager.setPanel("info", "left");
                        manager.setPanel("edu", "right");
                        delete localStorage.sessKey;
                        manager.panelIndex.edu.activeTeacherSession = false;
                    }, hours * 60 * 60 * 1000);
                });
                await Promise.all([delay__WEBPACK_IMPORTED_MODULE_2___default()(600), req]);
                this.destroySessionTimeout = setTimeout(async () => {
                    let req = _lib_ajax__WEBPACK_IMPORTED_MODULE_3__["default"].post("destroySession", {}, undefined, true);
                    manager.panelIndex.info.updateContents("LabAuth", "A teacher may log in with his edu.card to start the session.");
                    manager.panelIndex.edu.expectTeacher();
                    manager.setPanel("info", "left");
                    manager.setPanel("edu", "right");
                    delete localStorage.sessKey;
                    manager.panelIndex.edu.activeTeacherSession = false;
                }, hours * 60 * 60 * 1000);
                resButton();
            });
        }, () => {
            let subject = this.subjectElem.text();
            if (navigator.onLine)
                manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + subject + "</text-hightlight> here. To sign out, register your card again.");
            else
                manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + subject + "</text-hightlight> here. Your card will be synced when online.");
            manager.panelIndex.edu.subject = subject;
            manager.panelIndex.edu.maxHours = +this.hoursElem.text();
            manager.panelIndex.edu.expectStudent();
            manager.setPanel("info", "left");
            manager.setPanel("edu", "right").then(() => {
                this.abortButton.enable();
                manager.panelIndex.setUpPanel.resetInputs();
            });
        });
        this.apd(this.abortButton, this.confirmButton);
        this.updateButtonsMaybe();
    }
    subject(s) {
        this.subjectOK = !!s;
        this.subjectElem.text(s || "no subject");
        this.updateButtonsMaybe();
    }
    classroom(s) {
        this.classroomOK = !!s;
        this.classRoomElem.text(s || "no classroom");
        this.updateButtonsMaybe();
    }
    hours(s) {
        this.hoursOK = !!s;
        this.hoursElem.text(s || "0");
        this.updateButtonsMaybe();
    }
    updateButtonsMaybe() {
        if (this.subjectOK && this.classroomOK && this.hoursOK)
            this.confirmButton.enable();
        else
            this.confirmButton.disable();
    }
    async hightlightConfirmButton() {
        this.confirmButton.focus();
        await this.confirmButton.anim({ background: "rgba(0,0,0,0.05)" }, 300);
        await this.confirmButton.anim({ background: "rgba(0,0,0,0)" }, 300);
    }
    confirm() {
        this.confirmButton.click();
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./setUpConfirmationPanel.css */ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./setUpConfirmationPanel.pug */ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-setup-confirmation-panel', SetUpConfirmationPanel);


/***/ }),

/***/ "./app/_element/_panel/setUpPanel/setUpPanel.css":
/*!*******************************************************!*\
  !*** ./app/_element/_panel/setUpPanel/setUpPanel.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./setUpPanel.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpPanel/setUpPanel.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/_panel/setUpPanel/setUpPanel.pug":
/*!*******************************************************!*\
  !*** ./app/_element/_panel/setUpPanel/setUpPanel.pug ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<text-conatiner><svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewbox=\"0 0 24 24\" width=\"24\" id=\"back\"><path d=\"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z\"></path></svg><text-heading></text-heading><question-container></question-container></text-conatiner>");

/***/ }),

/***/ "./app/_element/_panel/setUpPanel/setUpPanel.ts":
/*!******************************************************!*\
  !*** ./app/_element/_panel/setUpPanel/setUpPanel.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SetUpPanel; });
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../panel */ "./app/_element/_panel/panel.ts");
/* harmony import */ var _setUpInput_setUpInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../setUpInput/setUpInput */ "./app/_element/setUpInput/setUpInput.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var extended_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! extended-dom */ "./node_modules/extended-dom/app/dist/edom.js");




class SetUpPanel extends _panel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(manager, addresser) {
        super();
        this.preferedWidth = 62.5;
        this.preventFocusInterference = true;
        this.questionContainer = this.q("question-container");
        this.headingElem = this.q("text-heading");
        this.backElem = this.q("#back").first;
        this.backButtonIsShown = false;
        this.headingElem.text("Hello " + addresser);
        let currentAnimation;
        let submitCb = async (back = false, submit = false) => {
            let sib = back ? this.activeElement.previousSibling : this.activeElement.nextSibling;
            if (sib) {
                currentAnimation = Symbol("anim");
                let localAniamtion = currentAnimation;
                let currentlyActive = this.activeElement;
                if (sib === this.inputs.first)
                    this.hideBackButton();
                else
                    this.showBackButton();
                if (back) {
                    currentlyActive.anim({ translateX: -10, opacity: 0 }, 500).then(() => currentlyActive.hide());
                    sib.css({ translateX: 10, opacity: 0 });
                    sib.show();
                    sib.focus();
                    sib.anim({ translateX: .1 }, 700);
                    delay__WEBPACK_IMPORTED_MODULE_2___default()(200).then(() => {
                        if (currentAnimation === localAniamtion) {
                            sib.show();
                            sib.focus();
                            sib.anim({ opacity: 1 }, 500);
                        }
                    });
                }
                else {
                    currentlyActive.anim({ translateX: 10, opacity: 0 }, 500).then(() => currentlyActive.hide());
                    sib.css({ translateX: -10, opacity: 0 });
                    sib.show();
                    sib.focus();
                    sib.anim({ translateX: .1 }, 700);
                    delay__WEBPACK_IMPORTED_MODULE_2___default()(200).then(() => {
                        if (currentAnimation === localAniamtion) {
                            sib.show();
                            sib.focus();
                            sib.anim({ opacity: 1 }, 500);
                        }
                    });
                }
                this.activeElement = sib;
            }
            else {
                if (back) {
                    await this.activeElement.anim({ translateX: -2 });
                    await this.activeElement.anim({ translateX: .1 });
                }
                else {
                    if (submit) {
                        manager.panelIndex.setUpConfirmationPanel.confirm();
                    }
                    else {
                        manager.panelIndex.setUpConfirmationPanel.hightlightConfirmButton();
                    }
                }
            }
        };
        this.backElem.on("mousedown", (e) => {
            // Prevent blur of SetUpInput
            e.preventDefault();
            if (this.backElem.css("opacity") === 0)
                return;
            submitCb(true);
        });
        this.inputs = new extended_dom__WEBPACK_IMPORTED_MODULE_3__["ElementList"](new _setUpInput_setUpInput__WEBPACK_IMPORTED_MODULE_1__["default"]("Please tell us what <highlight-text>subject</highlight-text> you are currently teaching.", "uppercase", (s) => {
            manager.panelIndex.setUpConfirmationPanel.subject(s);
        }), new _setUpInput_setUpInput__WEBPACK_IMPORTED_MODULE_1__["default"]("Please tell us which <highlight-text>classroom</highlight-text> you are teaching in.", "uppercase", (s) => {
            manager.panelIndex.setUpConfirmationPanel.classroom(s);
        }), new _setUpInput_setUpInput__WEBPACK_IMPORTED_MODULE_1__["default"]("Please tell us how many <highlight-text>hours</highlight-text> you are teaching for.", "number", (s) => {
            manager.panelIndex.setUpConfirmationPanel.hours(s);
        }, undefined, i => {
            if (i <= 0)
                return "Hours cannot be negative";
            if (i >= 7)
                return "The maximum lesson duration is 6 hours";
        }));
        this.inputs.ea((el) => {
            el.submitCallback = () => {
                submitCb(false, true);
            };
        });
        this.inputs.on("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                submitCb(e.shiftKey);
            }
        });
        this.activeElement = this.inputs.first;
        this.inputs.first.show();
        this.inputs.first.focus();
        this.questionContainer.apd(...this.inputs);
    }
    async showBackButton() {
        if (this.backButtonIsShown)
            return;
        let localAnimation = Symbol("anim");
        this.currentBackButtonAniamtion = localAnimation;
        this.backButtonIsShown = true;
        await Promise.all([
            this.backElem.anim({ translateX: 1 }, { duration: 700 }),
            delay__WEBPACK_IMPORTED_MODULE_2___default()(250).then(() => {
                if (this.currentBackButtonAniamtion === localAnimation)
                    return this.backElem.anim({ opacity: 1 }, { duration: 500 });
            }),
            this.headingElem.anim({ translateX: 1 }, { duration: 700 })
        ]);
    }
    async hideBackButton() {
        if (!this.backButtonIsShown)
            return;
        let localAnimation = Symbol("anim");
        this.currentBackButtonAniamtion = localAnimation;
        this.backButtonIsShown = false;
        await Promise.all([
            this.backElem.anim({ opacity: 0 }, { duration: 300 }),
            this.backElem.anim({ translateX: -10 }, { duration: 500 }),
            this.headingElem.anim({ translateX: -32 }, { duration: 700 })
        ]);
    }
    resetInputs() {
        this.inputs.ea((input) => {
            input.value = "";
        });
        this.inputs.first.show();
        this.inputs.first.css({ opacity: 1, translateX: .1 });
        for (let i = 1; i < this.inputs.length; i++) {
            const elem = this.inputs[i];
            elem.hide();
            elem.css("opacity", 0);
        }
        this.activeElement = this.inputs.first;
        this.hideBackButton();
    }
    activationCallback() {
        super.activationCallback();
        this.inputs.first.focus();
    }
    stl() {
        return super.stl() + __webpack_require__(/*! ./setUpPanel.css */ "./app/_element/_panel/setUpPanel/setUpPanel.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./setUpPanel.pug */ "./app/_element/_panel/setUpPanel/setUpPanel.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-setup-panel', SetUpPanel);


/***/ }),

/***/ "./app/_element/edu/austria.png":
/*!**************************************!*\
  !*** ./app/_element/edu/austria.png ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./app/_element/edu/edu.css":
/*!**********************************!*\
  !*** ./app/_element/edu/edu.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./edu.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/edu/edu.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/edu/edu.pug":
/*!**********************************!*\
  !*** ./app/_element/edu/edu.pug ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"edu\"><div id=\"edu-teacher\"></div><div id=\"edu_card\"><span>edu.card</span></div><div id=\"tgm___HTBLuVA_Wien_XX_1200_Wie\"><span>tgm - HTBLuVA Vienna XX<br/>1200 Vienna, Wexstraße 19-23</span></div><div id=\"fullNameContainer\"><div id=\"loadingSpinner\"></div><div id=\"moveFullName\"><div id=\"Maximilian_Mairinger\"><span>Unknown</span></div><div id=\"FullnameOverlay\"><div id=\"FullnameOverlayGradient\"></div><div id=\"FullnameOverlaySolid\"></div></div></div></div><img-user></img-user><div id=\"Username__mmairinger\"><span>Username: </span></div><div id=\"Geburtsdatum__29_2_2000\"><span>Employee: ?</span></div><div id=\"G_ltig_bis__29_08_2030\"><span>Lucky day: ?</span></div><div id=\"Wohnort_\"><span>Authentication:</span></div><div id=\"ID2424_Wien\"><span> </span></div><img-austria></img-austria><div id=\"stripe\"><div class=\"edu-container-side\"><span class=\"edu-card-side a\">edu.card</span><span class=\"edu-card-side b\">edu.card</span><span class=\"edu-card-side a\">edu.card</span><span class=\"edu-card-side b\">edu.card</span><span class=\"edu-card-side a\">edu.card</span></div></div></div>");

/***/ }),

/***/ "./app/_element/edu/edu.ts":
/*!*********************************!*\
  !*** ./app/_element/edu/edu.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edu; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var random_date_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! random-date-generator */ "./node_modules/random-date-generator/index.js");
/* harmony import */ var random_date_generator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(random_date_generator__WEBPACK_IMPORTED_MODULE_1__);


function prittyDate(date = random_date_generator__WEBPACK_IMPORTED_MODULE_1__["getRandomDate"](), year = false) {
    var set = date;
    var getDate = set.getDate().toString();
    if (getDate.length == 1) { //example if 1 change to 01
        getDate = "0" + getDate;
    }
    var getMonth = (set.getMonth() + 1).toString();
    if (getMonth.length == 1) {
        getMonth = "0" + getMonth;
    }
    var dateNow = getDate + "." + getMonth + (year ? "." + set.getFullYear() : "");
    return dateNow;
}
class Edu extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(expectedUser) {
        super(false);
        this.mainEduContainer = this.q("#edu");
        this.eduTeacher = this.q("#edu-teacher");
        this.usernameElement = this.q("#Username__mmairinger span");
        this.passcodeElem = this.q("#ID2424_Wien span");
        this.fullNameElem = this.q("#Maximilian_Mairinger span");
        this.luckyDayElem = this.q("#G_ltig_bis__29_08_2030 span");
        this.validUntilElem = this.q("#Geburtsdatum__29_2_2000 span");
        this.fullNameOverlay = this.q("#FullnameOverlay");
        this.moveFullName = this.q("#moveFullName");
        this.spinner = this.q("#loadingSpinner");
        if (expectedUser === "teacher")
            this.expectTeacher();
        else if (expectedUser === "student")
            this.expectStudent();
    }
    username(to) {
        this.usernameElement.text("Username: " + to);
    }
    updatePasscode(length = Math.ceil(Math.random() * 15)) {
        let num = Math.floor(Math.random() * ((Math.pow(10, ((length !== 0 ? 3 : 0) + (length * 0.7)) >= 17 ? 17 : ((length !== 0 ? 3 : 0) + (length * 0.7))))));
        this.passcodeElem.text(num === 0 ? "" : num);
    }
    fullName(to) {
        if (to === "") {
            this.fullNameElem.text("Unknown");
        }
        else {
            this.fullNameElem.text(to);
        }
    }
    luckyDay() {
        this.luckyDayElem.text("Lucky day: " + prittyDate());
    }
    clearLuckyDay() {
        this.luckyDayElem.text("Lucky day: ?");
    }
    employeeType(to) {
        this.validUntilElem.text("Employee: " + to);
    }
    authentication() {
        this.fullNameElem.text("Authenticating...");
        this.fullNameOverlay.css("opacity", 1);
        this.mainEduContainer.addClass("big");
        this.fullNameOverlay.anim([
            { translateX: 0, offset: 0 },
            { translateX: 10, offset: .9 },
            { translateX: 0 }
        ], { duration: 900, easing: "linear", iterations: Infinity });
        this.spinner.anim([
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: .8 },
            { opacity: 1 }
        ], 1000);
        this.spinner.anim([
            { rotateZ: 0, offset: 0 },
            { rotateZ: 360 }
        ], { duration: 1000, iterations: Infinity, easing: "linear" });
        this.moveFullName.anim([
            { translateX: 0, offset: 0 },
            { translateX: 0, offset: .5 },
            { translateX: 15 }
        ], 1000);
    }
    doneAuthentication() {
        this.mainEduContainer.removeClass("big");
        this.fullNameOverlay.css("opacity", 0);
        this.fullNameOverlay.anim({ translateX: 0 });
        this.moveFullName.anim({ translateX: 0 }, 300);
        this.spinner.anim({ opacity: 0 }).then(() => this.spinner.anim({ rotateZ: 0 }));
    }
    async expectStudent() {
        let c = this.fullNameOverlay.childs();
        c.first.css("background", "linear-gradient(90deg, rgba(83, 80, 74, 0), rgba(236, 168, 56, 1))");
        c[1].css("background", "rgb(236, 168, 56)");
        await this.eduTeacher.anim({ opacity: 0 });
    }
    async expectTeacher() {
        let c = this.fullNameOverlay.childs();
        c.first.css("background", "linear-gradient(90deg, rgba(77, 191, 238, 0), rgba(77, 191, 238, 1))");
        c[1].css("background", "rgb(77, 191, 238)");
        await this.eduTeacher.anim({ opacity: 1 });
    }
    stl() {
        return __webpack_require__(/*! ./edu.css */ "./app/_element/edu/edu.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./edu.pug */ "./app/_element/edu/edu.pug").default;
    }
}
window.customElements.define('c-edu', Edu);


/***/ }),

/***/ "./app/_element/edu/unknownAvatarDepth.svg":
/*!*************************************************!*\
  !*** ./app/_element/edu/unknownAvatarDepth.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTc5LjI3NSIgaGVpZ2h0PSIyNDkuNDQ4IiB2aWV3Qm94PSIwIDAgMTc5LjI3NSAyNDkuNDQ4Ij4NCiAgPGRlZnM+DQogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSIwLjEyNSIgeDI9IjAuODYzIiB5Mj0iMS4wMTkiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2M0YzdjYSIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYWFiMGI1Ii8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgPC9kZWZzPg0KICA8ZyBpZD0idW5rbm93bkF2YXRhckRlcHRoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjQxLjc5NiAtMzEzKSI+DQogICAgPHJlY3QgaWQ9ImJhY2tncm91bmQiIHdpZHRoPSIxNzkiIGhlaWdodD0iMjQ4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDIgMzEzKSIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQpIi8+DQogICAgPGcgaWQ9InVua25vd25BdmF0YXIiPg0KICAgICAgPGcgaWQ9ImF2YXRhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1OCAtMSkiPg0KICAgICAgICA8ZyBpZD0iYm9keSI+DQogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNCIgZGF0YS1uYW1lPSJQYXRoIDQiIGQ9Ik0tLjU0MSwxLjQ1MUMxLjMwOC0xLjk2Myw1OSwwLDU5LDBsLjExNiw4OC4zODNILTYxLjJWNDUuNzFzNDAuNC0xMy4xODMsNDYuNjE2LTE2Ljc4MWMxLjYxNy0yLjk0NCw3LjgzMi04LjUwNSwxMi40MTItMTAuNDY4Qy4xMTQsMTcuMTUzLTIuMzksNC44NjUtLjU0MSwxLjQ1MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ2MSA0NzUpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNSIgZGF0YS1uYW1lPSJQYXRoIDUiIGQ9Ik0tLjE5NSwxLjQ1MUMtMi4wNDQtMS45NjMtNTkuNzMxLDAtNTkuNzMxLDBWODguNDQ4SDYwLjA3di00MS45cy00MC0xNC4wMi00Ni4yMTgtMTcuNjE4QzEyLjIzNiwyNS45ODUsNi4wMiwyMC40MjQsMS40NDEsMTguNDYxLS44NDksMTcuMTUzLDEuNjU0LDQuODY1LS4xOTUsMS40NTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MTkgNDc1KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICA8L2c+DQogICAgICAgIDxnIGlkPSJoZWFkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSkiPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzEiIGRhdGEtbmFtZT0iUGF0aCAxIiBkPSJNNDguMzUzLDMuMDMzYzI5Ljc2OC0uMzI3LDU1LjQ0MSwyMi43MzEsNDYuNzYsNjYuNDY3cy0xNC42OTIsNjcuNjUzLTQ2Ljc2LDY3LjY1M1MxMy4zMzMsMTE3LjgzNCwwLDY5LjUsMTguNTg2LDMuMzYsNDguMzUzLDMuMDMzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQyIDM1NSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8yIiBkYXRhLW5hbWU9IlBhdGggMiIgZD0iTTUuNDcxLDUuMDgzYzEuNzc5LDAsNC4xNzcsMy42NjIsNS4xMzEsOC40ODYsMS4zNTUsNS4wNTYtLjI3LDEwLjc0LS4zODIsMTUtLjI0Miw5LjIwOS0uMTI2LDEyLjM3NC02LjM5LDcuNzc5cy03LjcwNi0uODgzLTcuNzA2LTEzLjU4NlMyLjE1OCw1LjA4Myw1LjQ3MSw1LjA4M1oiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTUxLCAwLjMwOSwgLTAuMzA5LCAwLjk1MSwgNTM0LjMyMywgNDIwLjI5NSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF81NiIgZGF0YS1uYW1lPSJQYXRoIDU2IiBkPSJNOC43MjksMzMuMTRjMS43NzksMCw0LjE3Ny0zLjY2Miw1LjEzMS04LjQ4NiwxLjM1NS01LjA1Ni0uMjctMTAuNzQtLjM4Mi0xNS0uMjQyLTkuMjA5LS4xMjYtMTIuMzc0LTYuMzktNy43NzlTLS42MTgsMi43NTQtLjYxOCwxNS40NTYsNS40MTUsMzMuMTQsOC43MjksMzMuMTRaIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC45NCwgMC4zNDIsIC0wLjM0MiwgLTAuOTQsIDQ2MS4wNDcsIDQ1NS4xNCkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICA8ZyBpZD0iaGFpciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU4IDEpIj4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzYiIGRhdGEtbmFtZT0iUGF0aCA2IiBkPSJNNC4xMjksMS43NzdjNS4xLTUuNzUsMTUuMzA3LS40LDE1LjMwNy0uNFM4LjUuOTY3LDUuNjY4LDMuMzE2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjk1LjEwMSAzNjYuNjU3KSByb3RhdGUoLTQ1KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNyIgZGF0YS1uYW1lPSJQYXRoIDciIGQ9Ik0zLjA1OS43ODVjMy4wMTgtNS4wMTIsMjguMzA2LjU4NywyOC4zMDYuNTg3UzEwLjcxMS0xLjIsNS42NjgsMS4xNTJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDUuMTg2IDM1Ni41MSkgcm90YXRlKC04KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfOCIgZGF0YS1uYW1lPSJQYXRoIDgiIGQ9Ik0tMS4yMTMuNGExNi4yMzgsMTYuMjM4LDAsMCwwLDE2LjUyLDEuNTQyUzQuNTMzLDIuMTMyLDEuNTM5LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOTcuOTY5IDM2Ni4xNzcpIHJvdGF0ZSgxNTApIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF85IiBkYXRhLW5hbWU9IlBhdGggOSIgZD0iTS0xLjIxMy40N0M3LjU5Myw5LjU0NSwxNy45NjEsMS4xLDE3Ljk2MSwxLjFTNS42NDcsMy43NDcsMS41MzksMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5My4zMTYgMzcwLjIzNSkgcm90YXRlKDEyOSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzEwIiBkYXRhLW5hbWU9IlBhdGggMTAiIGQ9Ik0tMS4xNTEsMS4wMzJDMi44MTcsOC44MTIsMjUuNzMzLS44NDMsMjUuNzMzLS44NDNTNi41MjksMi45LDIuNDItLjg1WiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMzU4LCAwLjkzNCwgLTAuOTM0LCAtMC4zNTgsIDI4OC40MTIsIDM3OC4yOTIpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8xMSIgZGF0YS1uYW1lPSJQYXRoIDExIiBkPSJNMTAuNTU1LTEuM2MzLjk2OCw3Ljc4LDE1LjEzLS4yNDQsMTUuMTMtLjI0NHMtOS40LDMuNDMxLTEzLjUwNS0uMzE2WiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMzI2LCAwLjk0NiwgLTAuOTQ2LCAtMC4zMjYsIDI4OC4wMjksIDM4OC4wOTMpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8yMSIgZGF0YS1uYW1lPSJQYXRoIDIxIiBkPSJNNTMuMjE5LTUuMzQyYzcuNDI2LDAsMTguNDI1LDMuMDc0LDI1LjMyMiw2LjQ0NUM4OS40NTksNi40MzgsOTMuNzIzLDE0Ljk3MSw5Ni4yLDE5LjA5NGM0LjA2MSw3LjksNS43ODcsMTUuNzc4LDUuNTYxLDMwLjEtLjEsNC41NzEtLjc3MiwxMy4xMjEtMS45NTMsMTMuMjczQzg2LjQyNyw2NC4yLDUxLjA1OSwzMi4zMzksMzYuNDM5LDMyLjMzOWMtMTkuODU2LDAtMzQuMzg3LDE1LjI1OS0zNC45NzQtNS41QzEuMjUsMTkuMjE1LDcuNjUxLDEyLjAxNiwxNS42ODEsNi4yMjZjNS42ODUtNC4xLDMuNDg2LTcuMTkxLDkuOTI4LTkuMjc3QzMzLjMxNS01LjU0OCw0Ni4yMjktNS4zNDIsNTMuMjE5LTUuMzQyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjc5IDM2MSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzIyIiBkYXRhLW5hbWU9IlBhdGggMjIiIGQ9Ik05LjExNC0xMC4yMTlsOC4xNDcsMi40NTJTNC4wOTUtLjc3NC0xLjEzMS0uMTExYy0xLjcxNy4yMTgtNC41LjQwNy0zLjYtMy43MVM5LjExNC0xMC4yMTksOS4xMTQtMTAuMjE5WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC43ODgsIC0wLjYxNiwgMC42MTYsIDAuNzg4LCAyODYuNzMzLCAzODMuMjI0KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMjMiIGRhdGEtbmFtZT0iUGF0aCAyMyIgZD0iTTkuMTE0LTEwLjIxOVMyMC43ODEtNC43MzIsMjEuMzY2LTQuMDVzMy41OTMsMy43LDcuOTcxLDguNjg3QzI3LjYyLDQuODU1LTMuMTIyLTQuNzg2LTMuNTM5LTQuOS41NjgtMTAuMyw5LjExNC0xMC4yMTksOS4xMTQtMTAuMjE5WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC43ODgsIC0wLjYxNiwgMC42MTYsIDAuNzg4LCAzMDQuNzMzLCAzNzAuMjI0KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMjQiIGRhdGEtbmFtZT0iUGF0aCAyNCIgZD0iTTE2LjA0NS0xMC45MDZzOC4zNzEuMTE2LDkuODM0LDEuMTM3LDEuOTEyLDQuMjI2LDYuMjksOS4yMTJDMzAuNDUyLS4zNC03Ljg2Ny01LjgyNC04LjI4NC01LjkzNy00LjE3Ny0xMS4zMzcsMTYuMDQ1LTEwLjkwNiwxNi4wNDUtMTAuOTA2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkxLjQxOCA0MTIuODc4KSByb3RhdGUoLTkyKSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMjUiIGRhdGEtbmFtZT0iUGF0aCAyNSIgZD0iTTAsMi43MTlDNC4wNi0zLjUyMSwxNi42NSwzLjg1LDE2LjY1LDMuODVTNS44NjYuMTYyLDEuNjYyLDMuMTY4WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC44NzUsIDAuNDg1LCAtMC40ODUsIDAuODc1LCAzNjIuMjI1LCAzNjYuNDAzKSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMjYiIGRhdGEtbmFtZT0iUGF0aCAyNiIgZD0iTTAsMy4zOWMzLjk2OC03Ljc4LDE0LjgwOS4yNjYsMTQuODA5LjI2NlM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzU4LjE5NCAzNjIuMTE2KSByb3RhdGUoMjUpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8yOCIgZGF0YS1uYW1lPSJQYXRoIDI4IiBkPSJNMCwzLjAxOUM0LjIyNy01LjA3LDE1LjYyMiw0LjEzOCwxNS42MjIsNC4xMzhTNS43MzMuMTgsMS42MjQsMy41MTdaIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk4NSwgMC4xNzQsIC0wLjE3NCwgMC45ODUsIDM1Mi4xMjEsIDM1OS44MDQpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8yOSIgZGF0YS1uYW1lPSJQYXRoIDI5IiBkPSJNMCwzLjM5YzMuOTY4LTcuNzgsMTUuNDQyLjgxNywxNS40NDIuODE3QTE5LjQxOCwxOS40MTgsMCwwLDAsNi4wNjMsOC42OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1NS42MzggMzYwLjg2OSkgcm90YXRlKDE4KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzAiIGRhdGEtbmFtZT0iUGF0aCAzMCIgZD0iTTAsMy4zOWMzLjk2OC03Ljc4LDE0LjgwOS4yNjYsMTQuODA5LjI2NlM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTYsIDAuMDg3LCAtMC4wODcsIDAuOTk2LCAzNDcuODY2LCAzNTguNDIyKSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzEiIGRhdGEtbmFtZT0iUGF0aCAzMSIgZD0iTTAsMy4zOWMzLjk2OC03Ljc4LDE0LjgwOS4yNjYsMTQuODA5LjI2NlM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTYsIDAuMDg3LCAtMC4wODcsIDAuOTk2LCAzNDUuODY2LCAzNTcuNDIyKSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzIiIGRhdGEtbmFtZT0iUGF0aCAzMiIgZD0iTTAsNC42NDRDMS4zMjkuNzExLDMuNTI5Ljg2Nyw2LjA0NC45NTlhNy44NDYsNy44NDYsMCwwLDEsMi4wMzUuMzkzQzExLjYxOCwyLjM4MSwxNi4wNDUsNi4yLDE2LjA0NSw2LjJTNS43MzMtLjE2NiwxLjYyNCw1LjQ4OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM2Ni41NzcgMzcwLjg3KSByb3RhdGUoMjgpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zMyIgZGF0YS1uYW1lPSJQYXRoIDMzIiBkPSJNMCw2LjgwOUMzLjM0NC0zLjc1LDI5LjEsNC41NjksMjkuMSw0LjU2OVMyMC42MzMsNC4wMzcsMy4xMjIsOC4wNzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMzQuNTU2IDM1Mi4yMTMpIHJvdGF0ZSg5KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQiIGRhdGEtbmFtZT0iUGF0aCAzNCIgZD0iTTEwLjU1NS0xLjNjMy45NjgsNy43OCwxNC44MDktLjI2NiwxNC44MDktLjI2NlMxNi4yODgsMS44OSwxMi4xNzktMS44NTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOTEuMTUyIDM2OS41NDEpIHJvdGF0ZSgxMjApIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNSIgZGF0YS1uYW1lPSJQYXRoIDM1IiBkPSJNMTAuNTU1LTEuM2MzLjk2OCw3Ljc4LDE0LjgwOS0uMjY2LDE0LjgwOS0uMjY2UzE2LjI4OCwxLjg5LDEyLjE3OS0xLjg1N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4OC40MzQgMzk0Ljg5NSkgcm90YXRlKDEwNykiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM2IiBkYXRhLW5hbWU9IlBhdGggMzYiIGQ9Ik0xMC41NTUtMS4zYzMuOTY4LDcuNzgsMTQuODA5LS4yNjYsMTQuODA5LS4yNjZTMTYuMjg4LDEuODksMTIuMTc5LTEuODU3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg5LjQzNCAzOTguODk1KSByb3RhdGUoMTA3KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzciIGRhdGEtbmFtZT0iUGF0aCAzNyIgZD0iTTAsMy4zOUMxLjMyOS43ODQsMy41MjkuODg3LDYuMDQ0Ljk0OCwxMC4xMTQsMS4wMzIsMTYuNiw0LjQyLDE2LjYsNC40MlM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc0LjAwNSAzNzkuMjI1KSByb3RhdGUoNTApIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zOCIgZGF0YS1uYW1lPSJQYXRoIDM4IiBkPSJNMCwzLjM5QzEuMzI5Ljc4NCwzLjUyOS44ODcsNi4wNDQuOTQ4YzQuMDcuMDg0LDEwLjYxNiwzLjQ0NiwxMC42MTYsMy40NDZTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3OC45NzcgMzg3LjcyMykgcm90YXRlKDY1KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzkiIGRhdGEtbmFtZT0iUGF0aCAzOSIgZD0iTS0yLjI1OCw2LjQ4MUMtLjI5My43MjUsMTAuOTI4LDIuMDI1LDE0LjY0NSwyLjE1OUE4OS43NDEsODkuNzQxLDAsMCwxLDI2Ljk4MSwzLjU2NiwxMjMuNTA4LDEyMy41MDgsMCwwLDEsMTMuMjQ4LDUuNDExQzguOTM0LDUuNyw0Ljk0MSw0LjE0MywyLjQsNy42WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMTcsIDEsIC0xLCAwLjAxNywgMzgzLjEyMiwgMzkyLjg4MykiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzQwIiBkYXRhLW5hbWU9IlBhdGggNDAiIGQ9Ik0wLDMuMzlDMS4zMjkuNzg0LDMuNTI5Ljg4Nyw2LjA0NC45NDhhMTguODE0LDE4LjgxNCwwLDAsMSw3Ljg4MiwyLjI4NlM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc5LjkyNyA0MDAuNjY5KSByb3RhdGUoNzIpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF80MSIgZGF0YS1uYW1lPSJQYXRoIDQxIiBkPSJNMCwzLjM5QzEuMDUzLDIuNjQ1LDMuNTE1LjU3NCw2LjAyOS42MzUsOC42NjMuNSwxMy45LDMuMjQyLDEzLjksMy4yNDJTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3OS4yNDggMzk1LjY5Nikgcm90YXRlKDY3KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDIiIGRhdGEtbmFtZT0iUGF0aCA0MiIgZD0iTTAsMy4zOUMxLjMyOS43ODQsMy41MjkuODg3LDYuMDQ0Ljk0OGM0LjA3LjA4NCw4Ljc2NSwyLjcwOCw4Ljc2NSwyLjcwOFM1LjczMy4yLDEuNjI0LDMuOTQ5WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNzUsIDAuOTI3LCAtMC45MjcsIDAuMzc1LCAzNzkuMzgzLCAzOTEuNjg2KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDMiIGRhdGEtbmFtZT0iUGF0aCA0MyIgZD0iTTAsMy4zOUMxLjMyOS43ODQsMy41MjkuODg3LDYuMDQ0Ljk0OGM0LjA3LjA4NCw4LjY0MSwyLjU0LDguNjQxLDIuNTRTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3OC43OTEgNDA2LjY3KSByb3RhdGUoNzEpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF80NCIgZGF0YS1uYW1lPSJQYXRoIDQ0IiBkPSJNMCwzLjM5QzEuMzI5Ljc4NCwzLjUyOS44ODcsNi4wNDQuOTQ4YzQuMDcuMDg0LDguNzY1LDIuNzA4LDguNzY1LDIuNzA4UzUuNzMzLjIsMS42MjQsMy45NDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzguOTI3IDQwNC42NjkpIHJvdGF0ZSg3MikiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ1IiBkYXRhLW5hbWU9IlBhdGggNDUiIGQ9Ik0wLDQuNjQ0QzEuMzI5LjcxMSwzLjUyOS44NjcsNi4wNDQuOTU5LDEwLjExNCwxLjA4NSwxNiw2LjA0OSwxNiw2LjA0OVM1LjczMy0uMTY2LDEuNjI0LDUuNDg4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzY5LjAyOSAzNzQuNTM0KSByb3RhdGUoMzIpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF80NiIgZGF0YS1uYW1lPSJQYXRoIDQ2IiBkPSJNMCw0LjY0NEMxLjMyOS43MTEsMy41MjkuODY3LDYuMDQ0Ljk1OWM0LjA3LjEyNiw4Ljc2NSw0LjA4Nyw4Ljc2NSw0LjA4N1M1LjczMy0uMTY2LDEuNjI0LDUuNDg4WiIgdHJhbnNmb3JtPSJtYXRyaXgoMC43NTUsIDAuNjU2LCAtMC42NTYsIDAuNzU1LCAzNjcuMTI1LCAzNjcuODk5KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDgiIGRhdGEtbmFtZT0iUGF0aCA0OCIgZD0iTTAsMy4zOUMzLjk2OC00LjM5LDE2LjEyNiw1LjEwNywxNi4xMjYsNS4xMDdTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTY2LCAwLjI1OSwgLTAuMjU5LCAwLjk2NiwgMzU4LjQyOSwgMzY1LjIxMSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzQ5IiBkYXRhLW5hbWU9IlBhdGggNDkiIGQ9Ik0wLDMuMzlDMS4zMjkuNzg0LDMuNTI5Ljg4Nyw2LjA0NC45NDhjNC4wNy4wODQsOC43NjUsMi43MDgsOC43NjUsMi43MDhTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0ibWF0cml4KDAuNTg4LCAwLjgwOSwgLTAuODA5LCAwLjU4OCwgMzczLjUxNywgMzc3LjA0MSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzUwIiBkYXRhLW5hbWU9IlBhdGggNTAiIGQ9Ik0wLDMuMzlDMS4zMjkuNzg0LDMuNTI5Ljg4Nyw2LjA0NC45NDhjNC4wNy4wODQsOC43NjUsMi43MDgsOC43NjUsMi43MDhTNS43MzMuMiwxLjYyNCwzLjk0OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM3OS44NzcgMzg2LjczMSkgcm90YXRlKDc5KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTEiIGRhdGEtbmFtZT0iUGF0aCA1MSIgZD0iTTAsMy4zOUMxLjMyOS43ODQsMy43MzcuNTg5LDYuMjUyLjY1YzQuMDcuMDg0LDguNTU3LDMuMDA2LDguNTU3LDMuMDA2UzUuNzMzLjIsMS42MjQsMy45NDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzODEuNDY0IDQxMC4xMDQpIHJvdGF0ZSg5MSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzUyIiBkYXRhLW5hbWU9IlBhdGggNTIiIGQ9Ik0wLDYuODA5YzMuNjQ3LTguNjMsMjYuMjkxLTIuNzE5LDI2LjMtLjc2MVMxMS4wMTgtLjQxOSwzLjEyMiw4LjA3N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMzNy41NTYgMzUzLjIxMykgcm90YXRlKDkpIiBmaWxsPSIjZjdmOWZhIi8+DQogICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF81MyIgZGF0YS1uYW1lPSJQYXRoIDUzIiBkPSJNMTAuMTA1LDEuNjUxYzMuMDIzLDIuMDQyLDExLjc1OC0yLjMsMTEuNzU4LTIuM3MtNS42OTUuNjI3LTYuNy0uNzMzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg4LjYxOSAzODYuNjg5KSByb3RhdGUoMTE1KSIgZmlsbD0iI2Y3ZjlmYSIvPg0KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTQiIGRhdGEtbmFtZT0iUGF0aCA1NCIgZD0iTTExLjA4OS0zLjc0NGMzLjk2OCw3Ljc4LDE0LjMsMi4zMDksMTQuMywyLjMwOVMxNi4wNDEuNjc0LDEzLjI4MS0zLjgzNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5MS4xNTIgMzYzLjU0MSkgcm90YXRlKDEyMCkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzU1IiBkYXRhLW5hbWU9IlBhdGggNTUiIGQ9Ik0tLjE3OCw1LjYyMmMxMy01LjU5NSwyOS40LTMuNDQxLDI5LjQtMy40NDFzLTkuMDI5LjE2NC0yNi41NDEsNC4yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIwLjU1NiAzNTAuMjEzKSByb3RhdGUoOSkiIGZpbGw9IiNmN2Y5ZmEiLz4NCiAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICAgIDwvZz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg0K");

/***/ }),

/***/ "./app/_element/element.css":
/*!**********************************!*\
  !*** ./app/_element/element.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./element.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/element.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/element.ts":
/*!*********************************!*\
  !*** ./app/_element/element.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _lib_interpolateHTMLWithLang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/interpolateHTMLWithLang */ "./app/lib/interpolateHTMLWithLang.ts");

class Component extends HTMLElement {
    constructor(elementBodyExtention) {
        super();
        this.elementBodyExtention = elementBodyExtention;
        this.sr = this.attachShadow({ mode: "open" });
        this.reinitHTML();
    }
    reinitHTML() {
        this.sr.html("");
        if (this.elementBodyExtention !== false) {
            this.elementBody = ce("element-body");
            if (this.elementBodyExtention === undefined) {
                this.mostInnerComponentbody = this.elementBody;
            }
            else {
                this.mostInnerComponentbody = this.elementBodyExtention;
                this.elementBody.apd(this.mostInnerComponentbody);
            }
            this.sr.html("<!--General styles--><style>" + __webpack_require__(/*! ./element.css */ "./app/_element/element.css").toString() + "</style><!--Main styles--><style>" + this.stl() + "</style>");
            this.sr.append(this.elementBody);
            this.mostInnerComponentbody.innerHTML = Object(_lib_interpolateHTMLWithLang__WEBPACK_IMPORTED_MODULE_0__["default"])(this.pug());
        }
        else {
            this.mostInnerComponentbody = this.sr;
            this.sr.html("<!--General styles--><style>" + __webpack_require__(/*! ./element.css */ "./app/_element/element.css").toString() + "</style><!--Main styles--><style>" + this.stl() + "</style>" + Object(_lib_interpolateHTMLWithLang__WEBPACK_IMPORTED_MODULE_0__["default"])(this.pug()));
        }
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this[attrName] = newVal;
    }
    /**
     * Appends to ShadowRoot
     */
    sra(...elems) {
        elems.ea((e) => {
            this.sr.append(e);
        });
    }
    q(qs) {
        return this.mostInnerComponentbody.childs(qs);
    }
    apd(...elems) {
        this.mostInnerComponentbody.append(...elems);
        return this;
    }
}
/*
import Element from "./../element";

export default class Example extends Element {
  constructor() {
    super()

  }
  stl() {
    return require("./example.css").toString()
  }
  pug() {
    return require("./example.pug").toString()
  }
}

window.customElements.define('c-example', Example);

*/


/***/ }),

/***/ "./app/_element/input/input.css":
/*!**************************************!*\
  !*** ./app/_element/input/input.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./input.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/input/input.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/input/input.pug":
/*!**************************************!*\
  !*** ./app/_element/input/input.pug ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/input/input.ts":
/*!*************************************!*\
  !*** ./app/_element/input/input.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var extended_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! extended-dom */ "./node_modules/extended-dom/app/dist/edom.js");


var emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Input extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(placeholder = "", type = "text", submitCallback, value, customVerification, intrusiveValidation) {
        super(false);
        this.submitCallback = submitCallback;
        this.customVerification = customVerification;
        this.intrusiveValidation = intrusiveValidation;
        this.input = ce("input");
        this.isUp = false;
        this.isFocused = false;
        this.enterAlreadyPressed = false;
        this.unintrusiveListener = this.input.ls("input", () => {
            if (this.intrusiveValidation) {
                this.unintrusiveListener.disable();
                return;
            }
            let invalid = this.validate();
            if (!invalid) {
                this.showInvalidation(false);
                this.unintrusiveListener.disable();
            }
        }, false);
        this.isDisabled = false;
        this.inputlisteners = new Map();
        this.upperCaseParseListener = this.input.ls("input", () => {
            this.input.value = this.input.value.toUpperCase();
        });
        this.currentlyInvalid = false;
        this.type = type;
        this.input.spellcheck = false;
        this.placeholderElem = ce("input-placeholder");
        this.placeholder = placeholder;
        this.placeholderElem.on("click", () => {
            this.input.focus();
        });
        this.placeholderElem.tabIndex = -1;
        // ----- Validation start
        // unintrusive
        this.input.on("blur", (e) => {
            if (this.intrusiveValidation)
                return;
            let invalid = this.validate();
            if (invalid) {
                this.showInvalidation(invalid);
                this.unintrusiveListener.enable();
            }
        });
        // intrusive
        this.input.on("input", () => {
            if (!this.intrusiveValidation)
                return;
            let invalid = this.validate();
            this.showInvalidation(invalid);
        });
        // ----- Validation end
        let mousedown = false;
        this.input.on('mousedown', () => {
            mousedown = true;
        });
        this.input.on("focus", (e) => {
            if (!mousedown) {
                if (this.input.value !== "")
                    this.input.select();
            }
        });
        this.input.on("blur", () => {
            mousedown = false;
            this.enterAlreadyPressed = false;
        });
        this.input.on("focus", () => {
            if (!this.isDisabled)
                this.input.focus();
            this.placeHolderUp();
        });
        this.input.on("blur", () => {
            if (this.value === "")
                this.placeHolderDown();
        });
        this.input.on("keydown", (e) => {
            if (e.key === "Enter" && this.submitCallback !== undefined && !this.enterAlreadyPressed && !this.currentlyInvalid) {
                this.enterAlreadyPressed = true;
                this.submitCallback(this.value, e);
            }
        });
        this.input.on("keydown", (e) => {
            e.preventHotkey = "input";
        });
        this.input.on("keyup", ({ key }) => {
            if (key === "Enter") {
                this.enterAlreadyPressed = false;
            }
        });
        this.on("focus", () => {
            this.isFocused = true;
        });
        this.on("blur", () => {
            this.isFocused = false;
        });
        this.apd(this.placeholderElem, this.input);
        this.allElems = new extended_dom__WEBPACK_IMPORTED_MODULE_1__["ElementList"](this.placeholderElem, this.input);
        if (value !== undefined)
            this.value = value;
    }
    disable() {
        if (this.isDisabled)
            return;
        this.isDisabled = true;
        this.allElems.addClass("disabled");
        if (this.isFocused)
            this.placeholderElem.focus();
        this.enterAlreadyPressed = false;
    }
    focus() {
        if (this.isDisabled)
            super.focus();
        else
            this.input.focus();
    }
    enable() {
        if (!this.isDisabled)
            return;
        this.isDisabled = false;
        this.allElems.removeClass("disabled");
        this.input.disabled = false;
        if (this.isFocused)
            this.input.focus();
    }
    onInput(f) {
        let inner = (e) => {
            if (!this.currentlyInvalid)
                f(this.value, e);
            else
                f("", e);
        };
        this.inputlisteners.set(f, inner);
        this.input.on("input", inner);
    }
    offInput(f) {
        this.input.off("input", this.inputlisteners.get(f));
        this.inputlisteners.delete(f);
    }
    set placeholder(to) {
        this.placeholderElem.text(to);
    }
    get placeholder() {
        return this.placeholderElem.text();
    }
    set type(to) {
        this.intrusiveValidation = to === "password" || to === "number";
        if (to === "password") {
            this.input.type = to;
            this.upperCaseParseListener.disable();
        }
        else if (to === "uppercase") {
            this.upperCaseParseListener.enable();
            this.input.type = "text";
        }
        else {
            this.input.type = "text";
            this.upperCaseParseListener.disable();
        }
        this._type = to;
    }
    get type() {
        return this._type;
    }
    isValid(emptyAllowed = true) {
        let valid = !this.validate();
        if (emptyAllowed)
            return valid;
        return this.value !== "" && valid;
    }
    get value() {
        let v = this.input.value;
        if (this.type === "number") {
            return +v;
        }
        return v;
    }
    set value(to) {
        this.input.value = to.toString();
        this.alignPlaceHolder();
        if (this.isDisabled)
            return;
        // unintrusice validation
        (() => {
            if (this.intrusiveValidation) {
                this.unintrusiveListener.disable();
                return;
            }
            let invalid = this.validate();
            if (!invalid) {
                this.showInvalidation(false);
                this.unintrusiveListener.disable();
            }
        })();
        // intrusive validation if (!this.intrusiveValidation) return
        (() => {
            if (!this.intrusiveValidation)
                return;
            let invalid = this.validate();
            this.showInvalidation(invalid);
        })();
        // onInput
        this.inputlisteners.forEach((inner, f) => {
            if (!this.currentlyInvalid)
                f(this.value);
            else
                f("");
        });
    }
    validate() {
        let invalid = false;
        if (this.type === "number")
            invalid = isNaN(this.value) ? "Expected a number" : false;
        else if (this.type === "email")
            invalid = emailValidationRegex.test(this.value.toLowerCase()) ? "This is not a valid email address" : false;
        if (this.customVerification !== undefined) {
            let returnInvalid = this.customVerification(this.value);
            if (typeof returnInvalid === "boolean") {
                if (!returnInvalid)
                    invalid = false;
            }
            else if (typeof returnInvalid === "string") {
                if (returnInvalid)
                    invalid = returnInvalid;
            }
        }
        if (this.input.value === "")
            invalid = false;
        return invalid;
    }
    alignPlaceHolder() {
        if (this.value === "" && !this.isFocused)
            this.placeHolderDown("css");
        else
            this.placeHolderUp("css");
    }
    async placeHolderUp(func = "anim") {
        if (!this.isUp) {
            // This seems to be too complex for typescript. Maybe in the future the ts-ignore can be removed. Proof that it should work.
            // this.placeholder.css({marginLeft: "13px", marginTop: "10px", fontSize: "1em"})
            // this.placeholder.anim({marginLeft: "13px", marginTop: "10px", fontSize: "1em"})
            //@ts-ignore
            this.placeholderElem[func]({ marginTop: "-1.2em", marginLeft: 0, fontSize: ".8em" });
            this.isUp = true;
            this.placeholderElem.css("cursor", "auto");
        }
    }
    placeHolderDown(func = "anim") {
        if (this.isUp) {
            //@ts-ignore
            this.placeholderElem[func]({ marginLeft: "13px", marginTop: "10px", fontSize: "1em" });
            this.isUp = false;
            this.placeholderElem.css("cursor", "text");
        }
    }
    showInvalidation(valid = true) {
        if (valid) {
            this.allElems.addClass("invalid");
            if (valid === true) {
                this.title = "Invalid input";
            }
            else if (typeof valid === "string") {
                this.title = valid;
            }
        }
        else {
            this.title = "";
            this.allElems.removeClass("invalid");
        }
        //@ts-ignore
        this.currentlyInvalid = !!valid;
    }
    static get observedAttributes() {
        return ["placeholder", "type", "value", "intrusiveValidation"];
    }
    stl() {
        return __webpack_require__(/*! ./input.css */ "./app/_element/input/input.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./input.pug */ "./app/_element/input/input.pug").default;
    }
}
window.customElements.define('c-input', Input);


/***/ }),

/***/ "./app/_element/panelManager/panelManager.css":
/*!****************************************************!*\
  !*** ./app/_element/panelManager/panelManager.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./panelManager.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/panelManager/panelManager.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/panelManager/panelManager.pug":
/*!****************************************************!*\
  !*** ./app/_element/panelManager/panelManager.pug ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<left-container class=\"container\"></left-container><right-container class=\"container\"></right-container>");

/***/ }),

/***/ "./app/_element/panelManager/panelManager.ts":
/*!***************************************************!*\
  !*** ./app/_element/panelManager/panelManager.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PanelManager; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var _panel_eduPanel_eduPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_panel/eduPanel/eduPanel */ "./app/_element/_panel/eduPanel/eduPanel.ts");
/* harmony import */ var _panel_informPanel_informPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_panel/informPanel/informPanel */ "./app/_element/_panel/informPanel/informPanel.ts");
/* harmony import */ var _panel_loginPanel_loginPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_panel/loginPanel/loginPanel */ "./app/_element/_panel/loginPanel/loginPanel.ts");
/* harmony import */ var _panel_setUpConfirmationPanel_setUpConfirmationPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_panel/setUpConfirmationPanel/setUpConfirmationPanel */ "./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.ts");
/* harmony import */ var _panel_setUpPanel_setUpPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_panel/setUpPanel/setUpPanel */ "./app/_element/_panel/setUpPanel/setUpPanel.ts");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_cardReader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/cardReader */ "./app/lib/cardReader.ts");








class PanelManager extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(entries, eduExpectedChangeCb) {
        super();
        this.leftContainer = this.q("left-container");
        this.rightContainer = this.q("right-container");
        this.panelIndex = {
            edu: new _panel_eduPanel_eduPanel__WEBPACK_IMPORTED_MODULE_1__["default"](this, entries, eduExpectedChangeCb),
            info: new _panel_informPanel_informPanel__WEBPACK_IMPORTED_MODULE_2__["default"](this, "LabAuth", "A teacher may log in with his edu.card to start the session."),
            login: new _panel_loginPanel_loginPanel__WEBPACK_IMPORTED_MODULE_3__["default"](this),
            setUpConfirmationPanel: new _panel_setUpConfirmationPanel_setUpConfirmationPanel__WEBPACK_IMPORTED_MODULE_4__["default"](this),
            setUpPanel: new _panel_setUpPanel_setUpPanel__WEBPACK_IMPORTED_MODULE_5__["default"](this, "there")
        };
    }
    setPanel(panel, side) {
        (async () => {
            let newPanel = this.panelIndex[panel];
            if (newPanel === this.left || newPanel === this.right)
                return;
            if (side === "left") {
                if (newPanel.preferedWidth === "big") {
                    this.leftContainer.anim({ width: "58.75%" }, 700);
                }
                else if (newPanel.preferedWidth === "small") {
                    this.leftContainer.anim({ width: "41.25%" }, 700);
                }
                else if (typeof newPanel.preferedWidth === "number") {
                    this.leftContainer.anim({ width: newPanel.preferedWidth + "%" }, 700);
                }
            }
            if (side === "left") {
                let lastLeft = this.left;
                this.left = this.panelIndex[panel];
                this.leftContainer.apd(this.left);
                if (lastLeft) {
                    lastLeft.anim({ opacity: 0, translateX: 5 }, 300).then(() => {
                        if (lastLeft)
                            lastLeft.deactivate();
                        lastLeft.remove();
                    });
                    await delay__WEBPACK_IMPORTED_MODULE_6___default()(150);
                }
                setTimeout(() => {
                    this.left.anim([{ opacity: 0, translateX: -5, offset: 0 }, { opacity: 1, translateX: .1 }], 400).then(() => {
                        this.left.activate();
                    });
                }, 0);
            }
            if (side === "right") {
                let lastRight = this.right;
                this.right = this.panelIndex[panel];
                this.rightContainer.apd(this.right);
                if (lastRight) {
                    lastRight.anim({ opacity: 0, translateX: 5 }, 300).then(() => {
                        if (lastRight)
                            lastRight.deactivate();
                        lastRight.remove();
                    });
                    await delay__WEBPACK_IMPORTED_MODULE_6___default()(150);
                }
                setTimeout(() => {
                    this.right.anim([{ opacity: 0, translateX: -5, offset: 0 }, { opacity: 1, translateX: .1 }], 400).then(() => {
                        this.right.activate();
                    });
                }, 0);
            }
            if (this.right && this.left) {
                let notExplicitlyPrevented = !this.right.preventFocusInterference && !this.left.preventFocusInterference;
                if ((this.right.wantsCardReader || this.left.wantsCardReader) && notExplicitlyPrevented)
                    _lib_cardReader__WEBPACK_IMPORTED_MODULE_7__["enable"]();
                else
                    _lib_cardReader__WEBPACK_IMPORTED_MODULE_7__["disable"]();
            }
        })();
        return delay__WEBPACK_IMPORTED_MODULE_6___default()(700);
    }
    stl() {
        return __webpack_require__(/*! ./panelManager.css */ "./app/_element/panelManager/panelManager.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./panelManager.pug */ "./app/_element/panelManager/panelManager.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-panel-manager', PanelManager);


/***/ }),

/***/ "./app/_element/setUpInput/setUpInput.css":
/*!************************************************!*\
  !*** ./app/_element/setUpInput/setUpInput.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./setUpInput.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/setUpInput/setUpInput.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/setUpInput/setUpInput.pug":
/*!************************************************!*\
  !*** ./app/_element/setUpInput/setUpInput.pug ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<text-conatiner> <text-paragraph></text-paragraph><c-input></c-input></text-conatiner>");

/***/ }),

/***/ "./app/_element/setUpInput/setUpInput.ts":
/*!***********************************************!*\
  !*** ./app/_element/setUpInput/setUpInput.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SetUpInput; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../input/input */ "./app/_element/input/input.ts");


class SetUpInput extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(question, type = "text", changeCallback, submitCallback, cunstomverifaction) {
        super(false);
        this.changeCallback = changeCallback;
        this.submitCallback = submitCallback;
        this.inputElem = this.q("c-input").first;
        this.questionElem = this.q("text-paragraph");
        this.inputElem.type = type;
        this.questionElem.html(question);
        this.inputElem.onInput((s, e) => {
            if (this.changeCallback)
                this.changeCallback(s, e);
        });
        this.inputElem.submitCallback = (s, e) => {
            if (this.submitCallback)
                this.submitCallback(s, e);
        };
        this.inputElem.customVerification = cunstomverifaction;
    }
    focus() {
        this.inputElem.focus();
    }
    get value() {
        return this.inputElem.value;
    }
    set value(val) {
        this.inputElem.value = val;
    }
    stl() {
        return __webpack_require__(/*! ./setUpInput.css */ "./app/_element/setUpInput/setUpInput.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./setUpInput.pug */ "./app/_element/setUpInput/setUpInput.pug").default;
    }
}
//@ts-ignore
window.customElements.define('c-setup-input', SetUpInput);


/***/ }),

/***/ "./app/_element/site/site.css":
/*!************************************!*\
  !*** ./app/_element/site/site.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./site.css */ "./node_modules/css-loader/dist/cjs.js!./app/_element/site/site.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/_element/site/site.pug":
/*!************************************!*\
  !*** ./app/_element/site/site.pug ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("");

/***/ }),

/***/ "./app/_element/site/site.ts":
/*!***********************************!*\
  !*** ./app/_element/site/site.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Site; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./app/_element/element.ts");
/* harmony import */ var _panelManager_panelManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../panelManager/panelManager */ "./app/_element/panelManager/panelManager.ts");
/* harmony import */ var front_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! front-db */ "./node_modules/front-db/app/dist/f-db.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! delay */ "./node_modules/delay/index.js");
/* harmony import */ var delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(delay__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ajaon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ajaon */ "./node_modules/ajaon/app/dist/ajaon.js");
/* harmony import */ var _lib_ajax__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/ajax */ "./app/lib/ajax.ts");






const textIndex = {
    offline: "Offline",
    online: "Online",
    syncing: "Syncing"
};
const widthIndex = {
    offline: 55,
    online: 50,
    syncing: 60
};
class Site extends _element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this.entries = new front_db__WEBPACK_IMPORTED_MODULE_2__["DataBase"](new front_db__WEBPACK_IMPORTED_MODULE_2__["Data"]([])).asArray;
        this.manager = new _panelManager_panelManager__WEBPACK_IMPORTED_MODULE_1__["default"](this.entries, (expectedCard) => {
            if (expectedCard === "student") {
                this.offlineIndecator.anim({ background: "#bf2612" });
            }
            else if (expectedCard === "teacher") {
                this.offlineIndecator.anim({ background: "#1f7eea" });
            }
        });
        this.iconContainer = ce("indecator-icon");
        this.offlineTextElem = ce("indecator-text");
        this.offlineIndecator = ce("offline-indecator").apd(this.iconContainer.apd(ce("offline-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"/><path fill="white" d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/></svg>'), ce("syncing-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="white" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"/></svg>'), ce("online-icon").html('<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="white" d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></svg>')), ce("indecator-dash").text("-"), this.offlineTextElem);
        this.currentlyInAnAnimation = false;
        window.addEventListener("online", () => {
            this.onOnlineStatusChange(true);
        });
        window.addEventListener("offline", () => {
            this.onOnlineStatusChange(false);
        });
        let validSessReq = _lib_ajax__WEBPACK_IMPORTED_MODULE_5__["default"].post("verifySession");
        validSessReq.then((res) => {
            if (res.valid) {
                this.manager.setPanel("info", "left");
                this.manager.setPanel("edu", "right");
                this.manager.panelIndex.edu.expectStudent();
                this.manager.panelIndex.edu.subject = res.subject;
                this.manager.panelIndex.edu.maxHours = res.hours;
                if (navigator.onLine)
                    this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + res.subject + "</text-hightlight> here. To sign out, register your card again.");
                else
                    this.manager.panelIndex.info.updateContents("LabAuth", "You may sign into <text-hightlight>" + res.subject + "</text-hightlight> here. Your card will be synced when online.");
            }
            else {
                this.manager.setPanel("info", "left");
                this.manager.setPanel("edu", "right");
                this.manager.panelIndex.edu.expectTeacher();
            }
        });
        validSessReq.fail(() => {
            this.manager.setPanel("info", "left");
            this.manager.setPanel("edu", "right");
            this.manager.panelIndex.edu.expectTeacher();
        });
        this.elementBody.apd(this.manager, this.offlineIndecator);
        if (!navigator.onLine) {
            this.onOnlineStatusChange(navigator.onLine);
        }
    }
    onOnlineStatusChange(online) {
        if (online) {
            this.display("syncing");
            this.display("online");
        }
        else
            this.display("offline");
    }
    async activateIcon(status) {
        let querySelector = status + "-icon";
        await this.iconContainer.childs().ea(async (icon) => {
            if (icon.matches(querySelector)) {
                icon.show();
                await icon.anim({ opacity: 1 });
            }
            else {
                await icon.anim({ opacity: 0 }).then(() => {
                    icon.hide();
                });
            }
        });
    }
    async setText(status) {
        if (this.offlineTextElem.css("opacity") !== 0)
            await this.offlineTextElem.anim({ opacity: 0 });
        this.offlineTextElem.text(textIndex[status]);
        await this.offlineTextElem.anim({ opacity: 1, width: widthIndex[status] });
    }
    async display(status) {
        this.currentAnimationStatus = status;
        if (this.currentlyInAnAnimation)
            return;
        this.currentlyInAnAnimation = true;
        let proms = [this.activateIcon(status), this.setText(status)];
        if (status === "offline" || status === "syncing") {
            proms.add(this.offlineIndecator.anim({ opacity: 1, height: 30 }));
            proms.add(this.manager.anim({ height: "calc(100% - 30px)" }));
            if (status === "syncing") {
                proms.add(Promise.all([delay__WEBPACK_IMPORTED_MODULE_3___default()(3000), ajaon__WEBPACK_IMPORTED_MODULE_4__["recall"].process]));
            }
            else {
                proms.add(delay__WEBPACK_IMPORTED_MODULE_3___default()(2000));
            }
        }
        else if (status === "online") {
            proms.add(delay__WEBPACK_IMPORTED_MODULE_3___default()(2000).then(() => this.offlineIndecator.anim({ opacity: 0, height: 0 })));
            proms.add(delay__WEBPACK_IMPORTED_MODULE_3___default()(2000).then(() => this.manager.anim({ height: "100%" })));
            proms.add(delay__WEBPACK_IMPORTED_MODULE_3___default()(3000));
        }
        await Promise.all(proms);
        this.currentlyInAnAnimation = false;
        if (status !== this.currentAnimationStatus)
            await this.display(this.currentAnimationStatus);
    }
    stl() {
        return __webpack_require__(/*! ./site.css */ "./app/_element/site/site.css").toString();
    }
    pug() {
        return __webpack_require__(/*! ./site.pug */ "./app/_element/site/site.pug").default;
    }
}
window.customElements.define('c-site', Site);


/***/ }),

/***/ "./app/lib/ajax.ts":
/*!*************************!*\
  !*** ./app/lib/ajax.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ajaon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajaon */ "./node_modules/ajaon/app/dist/ajaon.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(ajaon__WEBPACK_IMPORTED_MODULE_0__["default"])(undefined, "sessKey"));


/***/ }),

/***/ "./app/lib/cardReader.ts":
/*!*******************************!*\
  !*** ./app/lib/cardReader.ts ***!
  \*******************************/
/*! exports provided: addListener, removeListener, disable, enable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListener", function() { return addListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeListener", function() { return removeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disable", function() { return disable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enable", function() { return enable; });
let subscription = [];
let input = document.createElement("input");
let hide = document.createElement("hide-input");
input.css({
    position: "absolute",
    top: 0,
    left: 0
});
hide.css({
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    background: "white"
});
let disabled = 0;
//@ts-ignore
document.body.append(input, hide);
input.focus();
let blurListener = input.ls("blur", () => {
    input.focus();
});
input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        let val = input.value;
        input.value = "";
        if (input.tabIndex !== -1) {
            disable();
            let proms = [];
            subscription.forEach((f) => {
                proms.add(f(val));
            });
            await Promise.all(proms);
            enable();
        }
    }
});
function addListener(f) {
    subscription.push(f);
}
function removeListener(f) {
    const index = subscription.indexOf(f);
    if (index > -1) {
        subscription.splice(index, 1);
    }
}
function disable() {
    disabled++;
    updateState();
}
disable();
function enable() {
    if (disabled !== 0)
        disabled--;
    updateState();
}
function updateState() {
    if (disabled === 0) {
        input.tabIndex = 0;
        blurListener.enable();
        input.focus();
    }
    else {
        input.tabIndex = -1;
        blurListener.disable();
    }
}


/***/ }),

/***/ "./app/lib/interpolateHTMLWithLang.ts":
/*!********************************************!*\
  !*** ./app/lib/interpolateHTMLWithLang.ts ***!
  \********************************************/
/*! exports provided: resolveLang, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveLang", function() { return resolveLang; });
const lang = __webpack_require__(/*! ./../../res/lang/ger.json */ "./res/lang/ger.json");
const bracketOpen = "[";
const bracketClose = "]";
function interpolateHTMLWithLang(html) {
    let inter = "";
    let openIndex;
    let closeIndex;
    while (true) {
        openIndex = html.indexOf(bracketOpen);
        closeIndex = html.indexOf(bracketClose);
        if (openIndex !== -1) {
            inter += html.substring(0, openIndex);
            //@ts-ignore
            inter += resolveLang(html.substring(openIndex + 1, closeIndex));
            html = html.substr(closeIndex + 1);
        }
        else
            break;
    }
    inter += html;
    return inter;
}
function resolveLang(key) {
    let l = lang;
    key.split(".").ea((e) => {
        l = l[e];
        if (l === undefined) {
            console.error("Cannot get key \"" + key + "\" from lang.");
            l = key;
            return false;
        }
    });
    return l;
}
/* harmony default export */ __webpack_exports__["default"] = (interpolateHTMLWithLang);


/***/ }),

/***/ "./app/main.ts":
/*!*********************!*\
  !*** ./app/main.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _element_site_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_element/site/site */ "./app/_element/site/site.ts");

/* harmony default export */ __webpack_exports__["default"] = (function () {
    let site = new _element_site_site__WEBPACK_IMPORTED_MODULE_0__["default"]();
    document.body.append(site);
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/blockButton/blockButton.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/blockButton/blockButton.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":host {\n  border-radius: 2px;\n  height: 30px;\n  transition: border .4s, color .4s;\n}\n\nbutton-container {\n  display: flex;\n  height: 100%\n}\nbutton-text {\n  display: block;\n  font-size: 1em;\n  margin: auto 0;\n  padding: 0 20px;\n}\n\n:host {\n  border: 1px solid rgba(0,0,0,.24);\n}\n\n:host(:not(.enabled)) {\n  border: 1px solid rgba(0,0,0,.14);\n  color: rgb(191, 191, 191)\n}\n\n:host(:not(.enabled)) loading-spinner {\n  border-color: rgb(191, 191, 191);\n  border-top-color: transparent;\n}\n\n:host(:focus) {\n  border: 1px solid rgba(0,0,0,.6);\n}\n\nloading-spinner {\n  position: absolute;\n  height: 8px;\n  width: 8px;\n  top: 50%;\n  left: 14px;\n  transform: translateY(-50%) translateX(-50%);\n  border-radius: 50%;\n\n  border: 1.5px solid rgb(82, 82, 82);\n  border-top-color: transparent;\n  box-sizing: border-box;\n  opacity: 1;\n  transition: .4s border-color;\n\n  opacity: 0;\n}\n\n\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/rippleButton.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_button/_rippleButton/rippleButton.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":host {\n  position: relative;\n  overflow: hidden;\n}\nbutton-wave {\n  top: 0;\n  left: 0;\n  display: block;\n  border-radius: 100%;\n  height: 25px;\n  width: 25px;\n  position: absolute;\n  -webkit-transform: scale(0);\n  transform: scale(0);\n}\n\nbutton-wave {\n  background: rgba(0, 0, 0, .1);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_button/button.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_button/button.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":host {\n  display: block;\n  cursor: pointer;\n  user-select: none;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/eduPanel/eduPanel.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/eduPanel/eduPanel.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n::-webkit-scrollbar-track {\n  border-radius: 0;\n}\n\n\nelement-body {\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n}\n\nblack-bar {\n  background: hsl(0, 0%, 90%);\n  width: 50px;\n  height: 100%;\n  left: 100%;\n  position: absolute;\n}\n\nlist-conatiner {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: calc(100% + 50px);\n  background: hsl(0, 0%, 97%);\n  scroll-snap-align: start;\n}\n\nmain-conatiner {\n  position: absolute;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  scroll-snap-align: start;\n}\n\n\nscroll-conatiner {\n  \n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n\n  \n\n  overflow-y: auto;\n  width: 100%;\n}\n\nscroll-conatiner.cards {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\nscroll-conatiner.table {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\nc-edu {\n  zoom: .77;\n  margin: 15px 0;\n}\n\nhours-container {\n  display: inline-block;\n  position: absolute;\n  \n  transform: translateY(85px);\n}\n\nloading-bar {\n  display: block;\n  position: absolute;\n  \n  transform: translateY(75px);\n  overflow: hidden;\n  border-radius: 3px;\n  margin-top: 8px;\n\n  background: #D9D9D9;\n\n  width: 125px;\n  height: 6px;\n  opacity: 0;\n}\n\nloading-progress {\n  position: absolute;\n  border-radius: 3px;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n\n  background: #33AFF3;\n  box-shadow: 0px 0px 3px rgba(51, 175, 243, 0.61);\n}\n\n\nhour-box {\n  position: relative;\n  width: 50px;\n  height: 30px;\n  background: #D9D9D9;\n  margin: 0 2px;\n  display: inline-block;\n  opacity: 0;\n  border-radius: 2px;\n}\n\nhour-box.active {\n  background: #79C865;\n}\n\nhour-box.toBeGone {\n  background: #B7D3B0;\n}\n\n#arrow {\n  position: absolute;\n  bottom: 20px;\n  display: none;\n  opacity: 0;\n}\n\nother-cards-container {\n  display: inline-block;\n  width: min-content;\n  transform: translateY(125px);\n}\n\nother-cards-container:last-child {\n  margin-bottom: 50px;\n}\n\n#mainCard {\n  margin-top: 183px;\n}\n\nc-block-button {\n  position: absolute;\n  bottom: 20px;\n  opacity: 0;\n}\n\nc-block-button#canc {\n  left: 20px\n}\n\nc-block-button#conf {\n  right: 20px\n}\n\n\ntable-root {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  width: 80%;\n  row-gap: 20px;\n  margin-top: 50px;\n  margin-bottom: 50px;\n}\n\ntable-col {\n  display: flex;\n  justify-content: start;\n  align-items: center;\n  text-align: left;\n}\n\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/informPanel/informPanel.css":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/informPanel/informPanel.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n  align-items: center;\n}\n\ntext-conatiner {\n  display: inline-block;\n  width: 210px;\n  margin-left: 50px;\n}\n\ntext-heading {\n  position: relative;\n  float: left;\n  display: block;\n  margin-bottom: 2px;\n  font-size: 45px;\n  font-weight: bold;\n  min-height: 57.5px;\n}\n\ntext-paragraph {\n  position: relative;\n  float: left;\n  display: block;\n  margin-bottom: 10px;\n  line-height: 23px;\n  width: 100%;\n  min-height: 69px;\n}\n\nbottom-stripe {\n  position: relative;\n  float: left;\n  display: block;\n  height: 3px;\n  width: 40px;\n  background: #3B3B3B;\n}\n\ntext-hightlight {\n  font-weight: bold;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/loginPanel/loginPanel.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/loginPanel/loginPanel.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n  align-items: center;\n}\n\ntext-conatiner {\n  display: inline-block;\n  width: 210px;\n  margin-left: 50px;\n}\n\ntext-heading {\n  position: relative;\n  float: left;\n  display: block;\n  font-size: 45px;\n  font-weight: bold;\n  margin-bottom: 22.5px;\n}\n\nc-input {\n  position: relative;\n  float: left;\n  display: block;\n  width: 100%;\n  margin: 9px 0;\n}\n\nc-input:first-of-type {\n  margin-top: 0;\n}\n\nc-input:last-of-type {\n  margin-bottom: 0;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/panel.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/panel.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpConfirmationPanel/setUpConfirmationPanel.css ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\ntext-container {\n  display: inline-block;\n\n}\n\ntext-heading {\n  font-weight: bold;\n  font-size: 35px;\n  display: block;\n  margin-bottom: 5px;\n}\n\ntext-content {\n  display: inline-block;\n  width: 209px;\n}\n\n.hightlight {\n  font-weight: bold;\n  display: inline-block;\n  min-width: 47px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  vertical-align: top;\n}\n\nc-block-button {\n  position: absolute;\n}\n\nc-block-button {\n  position: absolute;\n  bottom: 20px;\n}\n\nc-block-button.abort {\n  left: 20px\n}\n\nc-block-button.confirm {\n  right: 20px\n}\n\n\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpPanel/setUpPanel.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/_panel/setUpPanel/setUpPanel.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n  align-items: center;\n}\n\ntext-heading {\n  display: block;\n  font-weight: bold;\n  font-size: 45px;\n  margin-bottom: 7px;\n  transform: translateX(-32px);\n}\n\ntext-conatiner  {\n  margin-left: 70px;\n  width: 400px;\n}\n\nc-setup-input {\n  position: absolute;\n  width: 100%;\n  display: none;\n}\n\nquestion-container {\n  display: block;\n  position: relative;\n  width: 260px;\n  min-height: 100.5px;\n}\n\n#back {\n  position: relative;\n  float: left;\n  margin-top: 13px;\n  margin-left: 6px;\n  opacity: 0;\n  transform: translateX(-10px);\n  cursor: pointer;\n  z-index: 1;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/edu/edu.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/edu/edu.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./unknownAvatarDepth.svg */ "./app/_element/edu/unknownAvatarDepth.svg");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ./austria.png */ "./app/_element/edu/austria.png");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
// Module
exports.push([module.i, ":host {\n  user-select: none;\n  display: inline-block;\n  width: 427px;\n  height: 257px;\n}\n\n#edu.big {\n  transform: scale(1.025);\n  box-shadow: 4px 4px 5px 0 #3a393921;\n}\n\n\n#edu {\n  overflow: hidden;\n  border-radius: 10px;\n  transition: transform .5s, box-shadow .5s;\n  box-shadow: 2px 2px 5px 0 #00000042;\n  position: relative;\n  width: 427px;\n  height: 257px;\n  overflow: hidden;\n  display: inline-block;\n  background: linear-gradient(#eeb14d 0%, #e89a16 100%);\n  color: black;\n}\n\n\n#edu-teacher {\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: linear-gradient(#4dd8ee 0%, #4d98ee 100%)\n}\n\n\n.Rectangle_2_j {\n  position: absolute;\n  overflow: visible;\n  width: 427px;\n  height: 257px;\n  left: 0px;\n  top: 0px;\n}\n#edu_card {\n  position: absolute;\n  left: 19px;\n  top: 7px;\n  overflow: visible;\n  width: 135px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 33px;\n}\n#tgm___HTBLuVA_Wien_XX_1200_Wie {\n  position: absolute;\n  left: 20px;\n  top: 47px;\n  overflow: visible;\n  width: 165px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\n\n#fullNameContainer {\n  position: absolute;\n  left: 19px;\n  top: 90px;\n  overflow: visible;\n  width: 143px;\n  height: 14px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 14px;\n}\n\n#moveFullName {\n  position: absolute;\n  display: inline-block;\n}\n\n#Maximilian_Mairinger {\n  left: 0;\n  top: 0\n}\n\n\n#FullnameOverlay {\n  position: absolute;\n  display: inline-block;\n  left: 101px;\n  top: 0;\n  height: 20px;\n  opacity: 0;\n  width: max-content;\n}\n#FullnameOverlayGradient {\n  position: relative;\n  float: left;\n  width: 5px;\n  height: 100%;\n  background: linear-gradient(90deg, rgba(83, 80, 74, 0), rgba(236, 168, 56, 1));\n}\n#FullnameOverlaySolid {\n  position: relative;\n  float: left;\n  width: 20px;  \n  height: 100%;\n  background: rgb(236, 168, 56)\n}\n\n#loadingSpinner {\n  position: absolute;\n  height: 6px;\n  width: 6px;\n  top: 50%;\n  left: 7.5px;\n  transform: translateY(-50%) translateX(-50%);\n  border-radius: 50%;\n\n  border: 1.5px solid black;\n  border-top-color: transparent;\n  box-sizing: border-box;\n  opacity: 0;\n}\n\n\n\nimg-user {\n  position: absolute;\n  width: 90px;\n  height: 124px;\n  left: 19px;\n  top: 113px;\n  overflow: visible;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  border-radius: 3px;\n}\n#Username__mmairinger {\n  position: absolute;\n  left: 126px;\n  top: 118px;\n  overflow: visible;\n  width: 131px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\n#Geburtsdatum__29_2_2000 {\n  position: absolute;\n  left: 127px;\n  top: 142px;\n  overflow: visible;\n  width: 144px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\n#G_ltig_bis__29_08_2030 {\n  position: absolute;\n  left: 127px;\n  top: 159px;\n  overflow: visible;\n  width: 124px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\n#Wohnort_ {\n  position: absolute;\n  left: 125px;\n  top: 203px;\n  overflow: visible;\n  width: 54px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\n#ID2424_Wien {\n  position: absolute;\n  left: 125px;\n  top: 220px;\n  overflow: visible;\n  width: 62px;\n  white-space: nowrap;\n  text-align: left;\n  font-family: Overpass;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 13px;\n}\nimg-austria {\n  position: absolute;\n  width: 65px;\n  height: 68px;\n  left: 300px;\n  top: 17px;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n}\n#stripe {\n  position: absolute;\n  width: 15px;\n  height: 257px;\n  left: 395px;\n  top: 0px;\n  overflow: visible;\n  background: linear-gradient(#cfcfcf 0%, #a2a6b1 100%);\n}\n\n.edu-container-side {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  z-index: 100;\n}\n\n.edu-card-side {\n  margin: 20px 0;\n  color: white;\n  height: 40px;\n  width: 40px;\n  font-size: 10px;\n  transform: rotate(90deg) translateY(-1px);\n  transform-origin: 12.5px 0;\n}\n\n.edu-card-side.b {\n  transform: rotate(270deg) translateX(-27px) translateY(-1px);\n  transform-origin: 2.5px 0;\n}\n\n.edu-card-side:nth-child(1) {\n  color: #98E4E4;\n}\n\n.edu-card-side:nth-child(2) {\n  color: #9DE1C3;\n}\n\n.edu-card-side:nth-child(3) {\n  color: #ACDF9E;\n}\n\n.edu-card-side:nth-child(4) {\n  color: #CBD5A4;\n}\n\n.edu-card-side:nth-child(5) {\n  color: #DAB5A3;\n}\n\n#Username__mmairinger span {\n  width: 250px;\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/element.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/element.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "::-webkit-scrollbar {\n  width: 4px;\n  height: 4px;\n}\n\n::-webkit-scrollbar-track {\n  border-radius: 10px;\n}\n\n::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  background: white;\n}\n\n:host(:focus){\n  outline: none;\n}\n*:focus{\n  outline:none;\n}\n\n::-webkit-scrollbar-corner {\n  background: rgba(0,0,0,0);\n}\n\n::selection {\n  background: rgba(0, 0, 0, 0.15);\n}\n\nelement-body {\n  width: 100%;\n  height: 100%;\n  display: block;\n  font-family: inherit;\n  position: absolute;\n  color: rgb(59, 59, 59);\n  transition: .3s color;\n  letter-spacing: .5px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/input/input.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/input/input.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":host {\n  display: block;\n  position: relative;\n  height: 38px;\n  width: 100%;\n  cursor: text;\n}\ninput {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px 13px;\n  border-radius: 2px;\n  font-size: .9em;\n  left: 0;\n  top: 0;\n  transition: color .3s, border .3s, opacity .3s;\n}\ninput-placeholder {\n  z-index: 2;\n  position: absolute;\n  margin: 10px 13px;\n  left: 0;\n  top: 0;\n  transition: color .3s, opacity .3s;\n\n  user-select: none\n}\n\n.invalid {\n  color: red;\n  border-color: red;\n}\n\n.disabled {\n  opacity: .3;\n}\n\ninput {\n  color: inherit;\n  background: white;\n  border: 1px solid rgba(0,0,0,.1);\n}\n\n:host(:focus-within) input:not(.invalid) {\n  border: 1px solid grey;\n}\n\n\ninput-placeholder {\n  color: inherit;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/panelManager/panelManager.css":
/*!******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/panelManager/panelManager.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n}\n\n.container {\n  height: 100%;\n  position: relative;\n  float: left;\n  display: block;\n}\n\nleft-container {\n  width: 41.25%;\n}\n\nleft-container > * {\n  opacity: 0;\n  transform: translateX(-5px);\n}\n\nright-container {\n  flex-grow: 1;\n  width: auto;\n  background: rgba(0, 0, 0, 3%);\n}\n\nright-container > * {\n  opacity: 0;\n  transform: translateX(-5px);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/setUpInput/setUpInput.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/setUpInput/setUpInput.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "element-body {\n  display: flex;\n  align-items: center;\n}\n\ntext-conatiner {\n  display: inline-block;\n}\n\ntext-heading {\n  position: relative;\n  float: left;\n  display: block;\n  margin-bottom: 2px;\n  font-size: 45px;\n  font-weight: bold;\n}\n\ntext-paragraph {\n  position: relative;\n  float: left;\n  display: block;\n  margin-bottom: 10px;\n  line-height: 23px;\n}\n\nc-input {\n  position: relative;\n  float: left;\n  display: block;\n  width: 200px;\n}\n\nhighlight-text {\n  font-weight: bold;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/_element/site/site.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/_element/site/site.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./../../../res/font/overpass.woff2 */ "./res/font/overpass.woff2");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, "element-body {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n\n@font-face {\n  font-family: 'Overpass';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\noffline-indecator {\n  height: 0px;\n  overflow: hidden;\n  width: 100%;\n  background: #1f7eea;\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  color: white;\n  opacity: 0;\n  user-select: none;\n}\noffline-indecator > indecator-icon {\n  position: relative;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n}\n\noffline-indecator > indecator-icon > * {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n}\n\noffline-indecator > indecator-dash {\n  position: relative;\n  float: left;\n\n  margin: 0 5px;\n}\n\noffline-indecator > indecator-text {\n  position: relative;\n  transform: translateY(1px);\n  opacity: 0;\n  width: 50px;\n  text-align: center;\n  overflow: hidden;\n  display: inline-block;\n}\n\nc-panel-manager {\n  width: 100%;\n  display: block;\n  height: 100%;\n  position: relative;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./res/font/overpass.woff2":
/*!*********************************!*\
  !*** ./res/font/overpass.woff2 ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:font/woff2;base64,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");

/***/ }),

/***/ "./res/lang/ger.json":
/*!***************************!*\
  !*** ./res/lang/ger.json ***!
  \***************************/
/*! exports provided: username, password, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"username\":\"Username\",\"password\":\"Passwort\"}");

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX2J1dHRvbi9fcmlwcGxlQnV0dG9uL2Jsb2NrQnV0dG9uL2Jsb2NrQnV0dG9uLmNzcz9jYmQ5Iiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fYnV0dG9uL19yaXBwbGVCdXR0b24vYmxvY2tCdXR0b24vYmxvY2tCdXR0b24ucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fYnV0dG9uL19yaXBwbGVCdXR0b24vYmxvY2tCdXR0b24vYmxvY2tCdXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19idXR0b24vX3JpcHBsZUJ1dHRvbi9yaXBwbGVCdXR0b24uY3NzP2M2ODEiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19idXR0b24vX3JpcHBsZUJ1dHRvbi9yaXBwbGVCdXR0b24ucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fYnV0dG9uL19yaXBwbGVCdXR0b24vcmlwcGxlQnV0dG9uLnRzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fYnV0dG9uL2J1dHRvbi5jc3M/N2U0MiIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX2J1dHRvbi9idXR0b24ucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fYnV0dG9uL2J1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2VkdVBhbmVsL2VkdVBhbmVsLmNzcz9kYWFiIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvZWR1UGFuZWwvZWR1UGFuZWwucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvZWR1UGFuZWwvZWR1UGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19wYW5lbC9pbmZvcm1QYW5lbC9pbmZvcm1QYW5lbC5jc3M/MmUzZiIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2luZm9ybVBhbmVsL2luZm9ybVBhbmVsLnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2luZm9ybVBhbmVsL2luZm9ybVBhbmVsLnRzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvbG9naW5QYW5lbC9sb2dpblBhbmVsLmNzcz9lYzAzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvbG9naW5QYW5lbC9sb2dpblBhbmVsLnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2xvZ2luUGFuZWwvbG9naW5QYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL3BhbmVsLmNzcz9kZDU0Iiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvcGFuZWwucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvcGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19wYW5lbC9zZXRVcENvbmZpcm1hdGlvblBhbmVsL3NldFVwQ29uZmlybWF0aW9uUGFuZWwuY3NzPzExZGMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19wYW5lbC9zZXRVcENvbmZpcm1hdGlvblBhbmVsL3NldFVwQ29uZmlybWF0aW9uUGFuZWwucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvc2V0VXBDb25maXJtYXRpb25QYW5lbC9zZXRVcENvbmZpcm1hdGlvblBhbmVsLnRzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvc2V0VXBQYW5lbC9zZXRVcFBhbmVsLmNzcz9mNzc0Iiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvc2V0VXBQYW5lbC9zZXRVcFBhbmVsLnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL3NldFVwUGFuZWwvc2V0VXBQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvZWR1L2F1c3RyaWEucG5nIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9lZHUvZWR1LmNzcz83OTgyIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9lZHUvZWR1LnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvZWR1L2VkdS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvZWR1L3Vua25vd25BdmF0YXJEZXB0aC5zdmciLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L2VsZW1lbnQuY3NzPzBkMTAiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L2lucHV0L2lucHV0LmNzcz9lZTljIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9pbnB1dC9pbnB1dC5wdWciLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L2lucHV0L2lucHV0LnRzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9wYW5lbE1hbmFnZXIvcGFuZWxNYW5hZ2VyLmNzcz8wMTZmIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9wYW5lbE1hbmFnZXIvcGFuZWxNYW5hZ2VyLnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvcGFuZWxNYW5hZ2VyL3BhbmVsTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvc2V0VXBJbnB1dC9zZXRVcElucHV0LmNzcz8xYzZjIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9zZXRVcElucHV0L3NldFVwSW5wdXQucHVnIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9zZXRVcElucHV0L3NldFVwSW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L3NpdGUvc2l0ZS5jc3M/NmM5OSIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvc2l0ZS9zaXRlLnB1ZyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvc2l0ZS9zaXRlLnRzIiwid2VicGFjazovLy8uL2FwcC9saWIvYWpheC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbGliL2NhcmRSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2xpYi9pbnRlcnBvbGF0ZUhUTUxXaXRoTGFuZy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX2J1dHRvbi9fcmlwcGxlQnV0dG9uL2Jsb2NrQnV0dG9uL2Jsb2NrQnV0dG9uLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX2J1dHRvbi9fcmlwcGxlQnV0dG9uL3JpcHBsZUJ1dHRvbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19idXR0b24vYnV0dG9uLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2VkdVBhbmVsL2VkdVBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2luZm9ybVBhbmVsL2luZm9ybVBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvX3BhbmVsL2xvZ2luUGFuZWwvbG9naW5QYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19wYW5lbC9wYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L19wYW5lbC9zZXRVcENvbmZpcm1hdGlvblBhbmVsL3NldFVwQ29uZmlybWF0aW9uUGFuZWwuY3NzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9fcGFuZWwvc2V0VXBQYW5lbC9zZXRVcFBhbmVsLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvX2VsZW1lbnQvZWR1L2VkdS5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L2VsZW1lbnQuY3NzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9pbnB1dC9pbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL19lbGVtZW50L3BhbmVsTWFuYWdlci9wYW5lbE1hbmFnZXIuY3NzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9zZXRVcElucHV0L3NldFVwSW5wdXQuY3NzIiwid2VicGFjazovLy8uL2FwcC9fZWxlbWVudC9zaXRlL3NpdGUuY3NzIiwid2VicGFjazovLy8uL3Jlcy9mb250L292ZXJwYXNzLndvZmYyIiwid2VicGFjazovLy91dGlsIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCk/MmRkMiIsIndlYnBhY2s6Ly8vYnVmZmVyIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vY3J5cHRvIChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXFCLG1CQUFPLENBQUMscUxBQXdFOztBQUVyRztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUFlLGlFQUFFLEU7Ozs7Ozs7Ozs7OztBQ0FqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJDO0FBQ2xCO0FBRVYsTUFBTSxXQUFZLFNBQVEscURBQVk7SUFJbkQsWUFBWSxVQUFrQixFQUFFLEVBQUUsa0JBQStFO1FBQy9HLEtBQUssRUFBRSxDQUFDO1FBSkYsYUFBUSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDNUIsWUFBTyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztRQUMvQixrQkFBYSxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztRQWN0Qyw0QkFBdUIsR0FBRyxJQUFJLEdBQUcsRUFBc0I7UUFWN0QsSUFBSSxrQkFBa0I7WUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQyxHQUFHLENBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLHFCQUFxQixDQUFDLGtCQUE4RSxFQUFFLGVBQTBCO1FBRXJJLElBQUksS0FBSyxH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QUF3Qyx1QkFBdUIsK0JBQStCLGVBQWUsZ0JBQWdCLHVCQUF1QixxQkFBcUIsMEJBQTBCLEdBQUcscUJBQXFCLGdCQUFnQixtQkFBbUIsaUJBQWlCLHVCQUF1QixHQUFHO0FBQ2wzQztBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFBZSxnRkFBaUIsd3owQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FoQyxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6InB1YmxpYy9kaXN0L2FwcC8xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Jsb2NrQnV0dG9uLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCJcIjsiLCJpbXBvcnQgUmlwcGxlQnV0dG9uIGZyb20gXCIuLi9yaXBwbGVCdXR0b25cIjtcbmltcG9ydCBkZWxheSBmcm9tIFwiZGVsYXlcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9ja0J1dHRvbiBleHRlbmRzIFJpcHBsZUJ1dHRvbiB7XG4gIHByaXZhdGUgdGV4dEVsZW0gPSBjZShcImJ1dHRvbi10ZXh0XCIpXG4gIHByaXZhdGUgc3Bpbm5lciA9IGNlKFwibG9hZGluZy1zcGlubmVyXCIpXG4gIHByaXZhdGUgdGV4dENvbnRhaW5lciA9IGNlKFwiYnV0dG9uLWNvbnRhaW5lclwiKVxuICBjb25zdHJ1Y3Rvcihjb250ZW50OiBzdHJpbmcgPSBcIlwiLCBhY3RpdmF0aW9uQ2FsbGJhY2s/OiAoKGU/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD4pKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChhY3RpdmF0aW9uQ2FsbGJhY2spIHRoaXMuYWRkQWN0aXZhdGlvbkNhbGxiYWNrKGFjdGl2YXRpb25DYWxsYmFjaylcbiAgICB0aGlzLmNvbnRlbnQoY29udGVudCk7XG4gICAgdGhpcy5hcGQoXG4gICAgICB0aGlzLnNwaW5uZXJcbiAgICApLmFwZChcbiAgICAgIHRoaXMudGV4dENvbnRhaW5lci5hcGQoXG4gICAgICAgIHRoaXMudGV4dEVsZW1cbiAgICAgIClcbiAgICApO1xuICB9XG4gIHByaXZhdGUgYWN0aXZhdGlvbkNhbGxiYWNrSW5kZXggPSBuZXcgTWFwPEZ1bmN0aW9uLCBGdW5jdGlvbj4oKVxuICBwdWJsaWMgYWRkQWN0aXZhdGlvbkNhbGxiYWNrKGFjdGl2YXRpb25DYWxsYmFjazogKChlPzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+KSwgYW5pbWF0aW9uRG9uZUNiPzogRnVuY3Rpb24pIHtcbiAgICBcbiAgICBsZXQgaW5uZXIgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGFjdGl2YXRpb25DYWxsYmFjay5jYWxsKHRoaXMsIGUpXG4gICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLmxvYWRpbmcoKSBcbiAgICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICAgICAgYXdhaXQgcmVzXG4gICAgICAgIHRoaXMuZG9uZUxvYWRpbmcoKVxuICAgICAgICBpZiAoYW5pbWF0aW9uRG9uZUNiKSBhd2FpdCBhbmltYXRpb25Eb25lQ2IuY2FsbCh0aGlzLCBlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYW5pbWF0aW9uRG9uZUNiKSBhd2FpdCBhbmltYXRpb25Eb25lQ2IuY2FsbCh0aGlzLCBlKVxuXG4gICAgICB0aGlzLmVuYWJsZSgpXG4gICAgfVxuICAgIFxuXG4gICAgc3VwZXIuYWRkQWN0aXZhdGlvbkNhbGxiYWNrKGlubmVyKVxuXG4gICAgdGhpcy5hY3RpdmF0aW9uQ2FsbGJhY2tJbmRleC5zZXQoYWN0aXZhdGlvbkNhbGxiYWNrLCBpbm5lcilcbiAgfVxuICBwdWJsaWMgcmVtb3ZlQWN0aXZhdGlvbkNhbGxiYWNrKGFjdGl2YXRpb25DYWxsYmFjazogKChlPzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+KSkge1xuICAgIGxldCBpbm5lciA9IHRoaXMuYWN0aXZhdGlvbkNhbGxiYWNrSW5kZXguZ2V0KGFjdGl2YXRpb25DYWxsYmFjaylcbiAgICBpZiAoaW5uZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3VwZXIucmVtb3ZlQWN0aXZhdGlvbkNhbGxiYWNrKGlubmVyIGFzIChlPzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpID0+IHZvaWQpXG4gICAgfVxuICB9XG4gIHByaXZhdGUgYXN5bmMgbG9hZGluZygpIHtcbiAgICBsZXQgcHJvbXMgPSBbXVxuICAgIGRlbGF5KDEwMCkudGhlbigoKSA9PiB7XG4gICAgICBwcm9tcy5hZGQodGhpcy5zcGlubmVyLmFuaW0oW1xuICAgICAgICB7b3BhY2l0eTogMCwgb2Zmc2V0OiAwfSxcbiAgICAgICAge29wYWNpdHk6IDF9XG4gICAgICBdLCA0MDApKVxuICAgICAgdGhpcy5zcGlubmVyLmFuaW0oW1xuICAgICAgICB7cm90YXRlWjogMCwgb2Zmc2V0OiAwfSxcbiAgICAgICAge3JvdGF0ZVo6IDM2MH1cbiAgICAgIF0sIHtkdXJhdGlvbjogMTAwMCwgaXRlcmF0aW9uczogSW5maW5pdHksIGVhc2luZzogXCJsaW5lYXJcIn0pXG4gICAgfSksXG4gICAgcHJvbXMuYWRkKHRoaXMudGV4dENvbnRhaW5lci5hbmltKHt0cmFuc2xhdGVYOiA2fSwgNDAwKSlcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21zKVxuICB9XG4gIHByaXZhdGUgYXN5bmMgZG9uZUxvYWRpbmcoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zcGlubmVyLmFuaW0oe29wYWNpdHk6IDB9KS50aGVuKCgpID0+IHRoaXMuc3Bpbm5lci5hbmltKHtyb3RhdGVaOiAwfSkpLFxuICAgICAgdGhpcy50ZXh0Q29udGFpbmVyLmFuaW0oe3RyYW5zbGF0ZVg6IC4xfSwgNDAwKVxuICAgIF0pXG4gIH1cbiAgY29udGVudCh0bzogc3RyaW5nKSB7XG4gICAgdGhpcy50ZXh0RWxlbS50ZXh0KHRvKVxuICB9XG4gIHN0bCgpIHtcbiAgICByZXR1cm4gc3VwZXIuc3RsKCkgKyByZXF1aXJlKCcuL2Jsb2NrQnV0dG9uLmNzcycpLnRvU3RyaW5nKCk7XG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiBzdXBlci5wdWcoKSArIHJlcXVpcmUoXCIuL2Jsb2NrQnV0dG9uLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2MtYmxvY2stYnV0dG9uJywgQmxvY2tCdXR0b24pO1xuIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3JpcHBsZUJ1dHRvbi5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICIsImV4cG9ydCBkZWZhdWx0IFwiXCI7IiwiaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi4vYnV0dG9uXCI7XG5pbXBvcnQgKiBhcyBkZWxheSBmcm9tIFwiZGVsYXlcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUmlwcGxlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgcHJpdmF0ZSByaXBwbGVzOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB3YXZlOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvcihhY3RpdmF0aW9uQ2FsbGJhY2s/OiAoZT86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSA9PiB2b2lkLCBlbmFibGVkPzogYm9vbGVhbiwgZm9jdXNPbkhvdmVyPzogYm9vbGVhbiwgdGFiSW5kZXg/OiBudW1iZXIpIHtcbiAgICAgIHN1cGVyKGVuYWJsZWQsIGZvY3VzT25Ib3ZlciwgdGFiSW5kZXgpO1xuICAgICAgc3VwZXIuYWRkQWN0aXZhdGlvbkNhbGxiYWNrKChlKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFJpcHBsZShlKTtcbiAgICAgIH0pXG4gICAgICBzdXBlci5hZGRBY3RpdmF0aW9uQ2FsbGJhY2soYWN0aXZhdGlvbkNhbGxiYWNrKTtcblxuICAgICAgdGhpcy53YXZlID0gY2UoXCJidXR0b24td2F2ZVwiKTtcblxuICAgICAgdGhpcy5yaXBwbGVzID0gY2UoXCJidXR0b24td2F2ZXNcIik7XG4gICAgICB0aGlzLmFwZCh0aGlzLnJpcHBsZXMpO1xuICAgIH1cbiAgICBwdWJsaWMgaW5pdFJpcHBsZShlPzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQgfCBcImNlbnRlclwiKSB7XG4gICAgICBsZXQgciA9IHRoaXMud2F2ZS5jbG9uZU5vZGUoKSBhcyBFbGVtZW50O1xuICAgICAgdGhpcy5yaXBwbGVzLmFwcGVuZChyKTtcblxuICAgICAgbGV0IGZhZGVBbmltID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHIuYW5pbSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogNDAwfSk7ICBcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgci5yZW1vdmUoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGZhZGVpc29rID0gKCkgPT4ge1xuICAgICAgICBpZiAocmR5VG9GYWRlKSBmYWRlQW5pbSgpO1xuICAgICAgICBlbHNlIHJkeVRvRmFkZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCB4OiBudW1iZXI7XG4gICAgICBsZXQgeTogbnVtYmVyO1xuXG5cbiAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5hYnNvbHV0ZU9mZnNldCgpO1xuICAgICAgICB4ID0gZS5wYWdlWCAtIG9mZnNldC5sZWZ0IC0gci53aWR0aCgpIC8gMjtcbiAgICAgICAgeSA9IGUucGFnZVkgLSBvZmZzZXQudG9wIC0gci5oZWlnaHQoKSAvIDI7XG5cbiAgICAgICAgdGhpcy5vbihcIm1vdXNldXBcIiwgZmFkZWlzb2ssIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgIHRoaXMub24oXCJtb3VzZW91dFwiLCBmYWRlaXNvaywge29uY2U6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB4ID0gdGhpcy53aWR0aCgpIC8gMiAtIHIud2lkdGgoKSAvIDI7XG4gICAgICAgIHkgPSB0aGlzLmhlaWdodCgpIC8gMiAtIHIuaGVpZ2h0KCkgLyAyO1xuXG4gICAgICAgIC8vZmFkZU91dFxuICAgICAgICB0aGlzLm9uKFwia2V5dXBcIiwgZmFkZWlzb2ssIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgIHRoaXMub24oXCJibHVyXCIsIGZhZGVpc29rLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgci5jc3Moe1xuICAgICAgICAgbWFyZ2luVG9wOiB5LFxuICAgICAgICAgbWFyZ2luTGVmdDogeFxuICAgICAgfSk7XG4gICAgICBsZXQgcmR5VG9GYWRlID0gZmFsc2U7XG4gICAgICByLmFuaW0oW3t0cmFuc2Zvcm06IFwic2NhbGUoMClcIiwgb2Zmc2V0OiAwfSwge3RyYW5zZm9ybTogXCJzY2FsZShcIiArICh0aGlzLndpZHRoKCkgLyAyNSAqIDIuMikgKyBcIilcIn1dLCB7ZHVyYXRpb246IDM1MCwgZWFzaW5nOiBcImxpbmVhclwifSkudGhlbihmYWRlaXNvayk7XG4gICAgfVxuICAgIHN0bCgpIHtcbiAgICAgIHJldHVybiBzdXBlci5zdGwoKSArIHJlcXVpcmUoJy4vcmlwcGxlQnV0dG9uLmNzcycpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHB1ZygpIHtcbiAgICAgIHJldHVybiBzdXBlci5wdWcoKSArIHJlcXVpcmUoXCIuL3JpcHBsZUJ1dHRvbi5wdWdcIikuZGVmYXVsdFxuICAgIH1cbn1cbiIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idXR0b24uY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAiLCJleHBvcnQgZGVmYXVsdCBcIlwiOyIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5pbXBvcnQgeyBUZWwgfSBmcm9tIFwiZXh0ZW5kZWQtZG9tXCI7XG5cblxuY29uc3QgcHJlc3NlZENsYXNzID0gXCJwcmVzc2VkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEVsZW1lbnQge1xuICBwcml2YXRlIGRvZXNGb2N1c09uSG92ZXI6IGJvb2xlYW47XG4gIHByaXZhdGUgbW91c2VPdmVyTGlzdGVuZXI6IFRlbDtcbiAgcHJpdmF0ZSBtb3VzZU91dExpc3RlbmVyOiBUZWw7XG4gIHByaXZhdGUgY2FsbGJhY2tzOiAoKGU6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSA9PiB2b2lkKVtdID0gW107XG5cbiAgcHJpdmF0ZSBwcmVmZXJlZFRhYkluZGV4OiBudW1iZXJcbiAgcHJpdmF0ZSBfaG90S2V5OiBzdHJpbmdcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlLCBmb2N1c09uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZSwgcHVibGljIHRhYkluZGV4OiBudW1iZXIgPSAwLCBwdWJsaWMgb2J0YWluRGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlLCBwdWJsaWMgcHJldmVudEZvY3VzID0gZmFsc2UsIGJsdXJPbk1vdXNlT3V0OiBib29sZWFuID0gZmFsc2UsIGhvdGtleT86IHN0cmluZykge1xuICAgIHN1cGVyKGZhbHNlKTtcblxuICAgIGlmIChlbmFibGVkKSB0aGlzLmVuYWJsZUZvcmNlKHRydWUpXG4gICAgZWxzZSB0aGlzLmVuYWJsZUZvcmNlKHRydWUpXG5cbiAgICB0aGlzLnByZWZlcmVkVGFiSW5kZXggPSB0aGlzLnRhYkluZGV4XG5cbiAgICBsZXQgYWxyZWFkeVByZXNzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLndoaWNoID09PSAxKSB0aGlzLmNsaWNrKGUpO1xuICAgIH0pO1xuICAgIHRoaXMub24oXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MocHJlc3NlZENsYXNzKTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhwcmVzc2VkQ2xhc3MpO1xuICAgIH0pXG4gICAgdGhpcy5vbihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCIgXCIgfHwgZS5rZXkgPT09IFwiRW50ZXJcIikgaWYgKCFhbHJlYWR5UHJlc3NlZCkge1xuICAgICAgICBhbHJlYWR5UHJlc3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xpY2soZSlcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uKFwia2V5dXBcIiwgKHtrZXl9KSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSBcIiBcIiB8fCBrZXkgPT09IFwiRW50ZXJcIil7XG4gICAgICAgIGFscmVhZHlQcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MocHJlc3NlZENsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICBhbHJlYWR5UHJlc3NlZCA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb3VzZU92ZXJMaXN0ZW5lciA9IHRoaXMubHMoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH0sIGZhbHNlKVxuICAgIHRoaXMubW91c2VPdXRMaXN0ZW5lciA9IHRoaXMubHMoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmJsdXIoKTtcbiAgICB9LCBmYWxzZSlcblxuICAgIHRoaXMuZm9jdXNPbkhvdmVyID0gZm9jdXNPbkhvdmVyO1xuICAgIHRoaXMuYmx1ck9uTW91c2VPdXQgPSBibHVyT25Nb3VzZU91dDtcbiAgICB0aGlzLmhvdGtleSA9IGhvdGtleVxuICB9XG4gIHByaXZhdGUgZW5hYmxlRm9yY2UocHJldkZvY3VzOiBib29sZWFuKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMudGFiSW5kZXggPSB0aGlzLnByZWZlcmVkVGFiSW5kZXhcbiAgICB0aGlzLmFkZENsYXNzKFwiZW5hYmxlZFwiKTtcbiAgICBpZiAoIXByZXZGb2N1cykgdGhpcy5mb2N1cygpXG4gIH1cbiAgcHVibGljIGVuYWJsZShwcmV2Rm9jdXM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgcmV0dXJuXG4gICAgdGhpcy5lbmFibGVGb3JjZShwcmV2Rm9jdXMpXG4gIH1cbiAgcHJpdmF0ZSBkaXNhYmxlRm9yY2UocHJldkJsdXI6IGJvb2xlYW4pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICAgIHRoaXMudGFiSW5kZXggPSB1bmRlZmluZWRcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiZW5hYmxlZFwiKTtcbiAgICBpZiAoIXByZXZCbHVyKSB0aGlzLmJsdXIoKVxuICB9XG4gIHB1YmxpYyBkaXNhYmxlKHByZXZCbHVyOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuXG4gICAgdGhpcy5kaXNhYmxlRm9yY2UocHJldkJsdXIpXG4gIH1cbiAgcHVibGljIHNldCBibHVyT25Nb3VzZU91dCh0bzogYm9vbGVhbikge1xuICAgIGlmICh0bykgdGhpcy5tb3VzZU91dExpc3RlbmVyLmVuYWJsZSgpO1xuICAgIGVsc2UgdGhpcy5tb3VzZU91dExpc3RlbmVyLmRpc2FibGUoKTtcbiAgfVxuICBwdWJsaWMgYWRkQWN0aXZhdGlvbkNhbGxiYWNrKGNiPzogKGU6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSA9PiB2b2lkKSB7XG4gICAgaWYgKGNiICE9PSB1bmRlZmluZWQpIHRoaXMuY2FsbGJhY2tzLmFkZChjYik7XG4gIH1cbiAgcHVibGljIHJlbW92ZUFjdGl2YXRpb25DYWxsYmFjayhjYj86IChlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCkge1xuICAgIGlmIChjYiAhPT0gdW5kZWZpbmVkKSB0aGlzLmNhbGxiYWNrcy5yZW1vdmVWKGNiKTtcbiAgfVxuICBwdWJsaWMgc2V0IGZvY3VzT25Ib3Zlcih0bzogYm9vbGVhbikge1xuICAgIHRoaXMuZG9lc0ZvY3VzT25Ib3ZlciA9IHRvO1xuICAgIGlmICh0bykge1xuICAgICAgdGhpcy5tb3VzZU92ZXJMaXN0ZW5lci5lbmFibGUoKTtcbiAgICAgIHRoaXMubW91c2VPdXRMaXN0ZW5lci5lbmFibGUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm1vdXNlT3Zlckxpc3RlbmVyLmRpc2FibGUoKTtcbiAgICAgIHRoaXMubW91c2VPdXRMaXN0ZW5lci5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBnZXQgZm9jdXNPbkhvdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRvZXNGb2N1c09uSG92ZXI7XG4gIH1cbiAgcHVibGljIGNsaWNrKGU/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChlICE9PSB1bmRlZmluZWQgJiYgIXRoaXMub2J0YWluRGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGlmICghdGhpcy5wcmV2ZW50Rm9jdXMpIHRoaXMuZm9jdXMoKTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MocHJlc3NlZENsYXNzKTtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmZvckVhY2goZiA9PiB7Zi5jYWxsKHRoaXMsIGUpO30pO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGhvdEtleUxpc3RlbmVyOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZFxuICBwdWJsaWMgc2V0IGhvdGtleSh0bzogc3RyaW5nKSB7XG4gICAgaWYgKHRvID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9ob3RLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkb2N1bWVudC5vZmYoXCJrZXlkb3duXCIsIHRoaXMuaG90S2V5TGlzdGVuZXIpXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhvdEtleUxpc3RlbmVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuX2hvdEtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmhvdEtleUxpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0UGFyZW50ICE9PSBudWxsKSBpZiAoZS5rZXkgPT09IHRoaXMuX2hvdEtleSkgdGhpcy5jbGljaygpXG4gICAgICB9XG4gICAgICBkb2N1bWVudC5vbihcImtleWRvd25cIiwgdGhpcy5ob3RLZXlMaXN0ZW5lcilcbiAgICB9XG4gICAgdGhpcy5faG90S2V5ID0gdG9cbiAgfVxuICBwdWJsaWMgZ2V0IGhvdGtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5faG90S2V5XG4gIH1cbiAgc3RsKCkge1xuICAgIHJldHVybiByZXF1aXJlKCcuL2J1dHRvbi5jc3MnKS50b1N0cmluZygpO1xuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vYnV0dG9uLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLWJ1dHRvbicsIEJ1dHRvbik7XG4iLCJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZWR1UGFuZWwuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAiLCJleHBvcnQgZGVmYXVsdCBcIjxtYWluLWNvbmF0aW5lcj48aG91cnMtY29udGFpbmVyPiA8L2hvdXJzLWNvbnRhaW5lcj48bG9hZGluZy1iYXI+PGxvYWRpbmctcHJvZ3Jlc3M+PC9sb2FkaW5nLXByb2dyZXNzPjwvbG9hZGluZy1iYXI+PHNjcm9sbC1jb25hdGluZXIgY2xhc3M9XFxcImNhcmRzXFxcIj48b3RoZXItY2FyZHMtY29udGFpbmVyPjwvb3RoZXItY2FyZHMtY29udGFpbmVyPjwvc2Nyb2xsLWNvbmF0aW5lcj48c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjE3XFxcIiBoZWlnaHQ9XFxcIjkuNzJcXFwiIHZpZXdib3g9XFxcIjAgMCAxNyA5LjcyXFxcIiBpZD1cXFwiYXJyb3dcXFwiPjxwYXRoIGlkPVxcXCJVbmlvbl84XFxcIiBkYXRhLW5hbWU9XFxcIlVuaW9uIDhcXFwiIGQ9XFxcIk0xMjQ0LjEyMy04MzExLjhsLS4xODEuMTg0LTcuMjg5LTcuMjg5LjM2LS4zNjMsNy4xMDYsNy4xLDcuMTcxLTcuMTcyLjM2My4zNjMtNy4zNTQsNy4zNTJaXFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgtMTIzNS42NTMgODMyMC4zNDEpXFxcIiBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiM3YTdhN2FcXFwiIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLWxpbmVqb2luPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLW1pdGVybGltaXQ9XFxcIjEwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjJcXFwiPjwvcGF0aD48L3N2Zz48L21haW4tY29uYXRpbmVyPjxibGFjay1iYXI+PC9ibGFjay1iYXI+PGxpc3QtY29uYXRpbmVyPjxzY3JvbGwtY29uYXRpbmVyIGNsYXNzPVxcXCJ0YWJsZVxcXCI+PHRhYmxlLXJvb3Q+PC90YWJsZS1yb290Pjwvc2Nyb2xsLWNvbmF0aW5lcj48L2xpc3QtY29uYXRpbmVyPlwiOyIsImltcG9ydCBQYW5lbCBmcm9tIFwiLi4vcGFuZWxcIlxuaW1wb3J0IEVkdSBmcm9tIFwiLi4vLi4vZWR1L2VkdVwiXG5pbXBvcnQgeyBFbGVtZW50TGlzdCB9IGZyb20gXCJleHRlbmRlZC1kb21cIjtcbmltcG9ydCBkZWxheSBmcm9tIFwiZGVsYXlcIlxuaW1wb3J0IEVhc2luZyBmcm9tIFwid2FhcGktZWFzaW5nXCJcbmltcG9ydCB7IERhdGEsIERhdGFBcnJheSB9IGZyb20gXCJmcm9udC1kYlwiO1xuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi4vLi4vX2J1dHRvbi9fcmlwcGxlQnV0dG9uL2Jsb2NrQnV0dG9uL2Jsb2NrQnV0dG9uXCJcbmltcG9ydCBhbmltYXRlZFNjcm9sbFRvIGZyb20gXCJhbmltYXRlZC1zY3JvbGwtdG9cIlxuaW1wb3J0IFBhbmVsTWFuYWdlciBmcm9tIFwiLi4vLi4vcGFuZWxNYW5hZ2VyL3BhbmVsTWFuYWdlclwiO1xuaW1wb3J0IGFqYXggZnJvbSBcIi4uLy4uLy4uL2xpYi9hamF4XCI7XG5pbXBvcnQgKiBhcyBjYXJkUmVhZGVyIGZyb20gXCIuLi8uLi8uLi9saWIvY2FyZFJlYWRlclwiXG5pbXBvcnQgU0hBMjU2IGZyb20gXCJjcnlwdG8tanMvc2hhMjU2XCJcblxuXG50eXBlIFBlcmNlbnQgPSBudW1iZXJcblxubGV0IGVhc2luZyA9IG5ldyBFYXNpbmcoMC40ODUsIDAuMDEwLCAwLjE1NSwgMSk7XG5cblxuZXhwb3J0IHR5cGUgRW50cnkgPSB7XG4gIGZ1bGxOYW1lOiBzdHJpbmcsXG4gIHVzZXJuYW1lOiBzdHJpbmcsXG4gIHJlZ2lzdGVyZWQ6IChcImdvbmVcIiB8IFwidG9CZUdvbmVcIiB8IFwiYWN0aXZlXCIpW11cbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudEhvdXIoKSB7XG4gIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICBsZXQgaCA9IGRhdGUuZ2V0SG91cnMoKVxuICBsZXQgbWluID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgaWYgKG1pbiA+IDMwKSBoKytcbiAgcmV0dXJuIGhcbn1cblxuXG5jb25zdCBrbm93bkxvZ2luczoge1xuICBzdHVkZW50OiB7XG4gICAgW2VuY3J5cHRlZENhcmRJZDogc3RyaW5nXTogRW50cnkgJiB7XG4gICAgICBzdGFydE9mTGFzdFVuaXQ/OiBudW1iZXJcbiAgICAgIHNpZ24/OiBcImluXCIgfCBcIm91dFwiXG4gICAgfVxuICB9LFxuICB0ZWFjaGVyOiB7XG4gICAgW2VuY3J5cHRlZENhcmRJZDogc3RyaW5nXToge1xuICAgICAgdXNlcm5hbWU6IHN0cmluZyxcbiAgICAgIGZ1bGxOYW1lOiBzdHJpbmdcbiAgICB9XG4gIH1cbn0gPSB7XG4gIHN0dWRlbnQ6IHtcblxuICB9LFxuICB0ZWFjaGVyOiB7XG5cbiAgfVxufVxuXG5jb25zdCB0ZWFjaGVyU3RyaW5nID0gXCJ0ZWFjaGVyXCJcbmNvbnN0IHN0dWRlbnRTdHJpbmcgPSBcInN0dWRlbnRcIlxuY29uc3QgZW1wbG95ZWVUeXBlU3RyaW5nID0gXCJlbXBsb3llZVR5cGVcIlxuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gIGxldCByZXMgPSBhd2FpdCBhamF4LmdldChcImNhcmRJbmRleFwiLCB0cnVlKVxuXG4gIGZvciAobGV0IGtleSBpbiByZXMuc3R1ZGVudCkge1xuICAgIGlmICgha25vd25Mb2dpbnMuc3R1ZGVudFtrZXldKSB7XG4gICAgICBrbm93bkxvZ2lucy5zdHVkZW50W2tleV0gPSByZXMuc3R1ZGVudFtrZXldXG4gICAgICBrbm93bkxvZ2lucy5zdHVkZW50W2tleV1bZW1wbG95ZWVUeXBlU3RyaW5nXSA9IHN0dWRlbnRTdHJpbmdcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQga2V5IGluIHJlcy50ZWFjaGVyKSB7XG4gICAgaWYgKCFrbm93bkxvZ2lucy50ZWFjaGVyW2tleV0pIHtcbiAgICAgIGtub3duTG9naW5zLnRlYWNoZXJba2V5XSA9IHJlcy50ZWFjaGVyW2tleV1cbiAgICAgIGtub3duTG9naW5zLnRlYWNoZXJba2V5XVtlbXBsb3llZVR5cGVTdHJpbmddID0gdGVhY2hlclN0cmluZ1xuICAgIH1cbiAgfVxuXG59LCAwKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZHVQYW5lbCBleHRlbmRzIFBhbmVsIHtcbiAgcHVibGljIHByZWZlcmVkV2lkdGg6IFwiYmlnXCIgfCBcInNtYWxsXCIgfCBQZXJjZW50XG4gIHB1YmxpYyBtYWluQ2FyZDogRWR1O1xuICBwcml2YXRlIG1haW5Cb2R5ID0gdGhpcy5xKFwibWFpbi1jb25hdGluZXJcIilcbiAgcHJpdmF0ZSBob3Vyc0NvbnRhaW5lciA9IHRoaXMucShcImhvdXJzLWNvbnRhaW5lclwiKVxuICBwcml2YXRlIG90aGVyQ2FyZHNDb250YWluZXIgPSB0aGlzLnEoXCJvdGhlci1jYXJkcy1jb250YWluZXJcIikuZmlyc3RcbiAgcHJpdmF0ZSBjYXJkc0NvbnRhaW5lciA9IHRoaXMucShcInNjcm9sbC1jb25hdGluZXIuY2FyZHNcIikuZmlyc3RcbiAgcHJpdmF0ZSB0YWJsZUNvbnRhaW5lciA9IHRoaXMucShcInNjcm9sbC1jb25hdGluZXIudGFibGVcIikuZmlyc3RcbiAgcHJpdmF0ZSB0YWJsZVJvb3QgPSB0aGlzLnEoXCJ0YWJsZS1yb290XCIpLmZpcnN0XG4gIHByaXZhdGUgYXJyb3cgPSB0aGlzLnEoXCIjYXJyb3dcIikuZmlyc3RcblxuICBwcml2YXRlIGJ1dHRvbnM6IEVsZW1lbnRMaXN0PEJ1dHRvbj5cbiAgcHJpdmF0ZSBjYW5jQnV0dG9uOiBCdXR0b25cbiAgcHJpdmF0ZSBjb25mQnV0dG9uOiBCdXR0b25cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hbmFnZXI6IFBhbmVsTWFuYWdlciwgcHJpdmF0ZSBsaXN0OiBEYXRhQXJyYXk8RW50cnk+LCBwdWJsaWMgZWR1RXhwZWN0ZWRDaGFuZ2VDYj86IChlZHU6IFwic3R1ZGVudFwiIHwgXCJ0ZWFjaGVyXCIpID0+IHZvaWQpIHtcbiAgICBzdXBlcigpXG5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgIGlmICghdGhpcy5jdXJyZW50bHlTaG93aW5nQ29uZmlybU9wdGlvbnMpIGlmICh0aGlzLmV4cGVjdGVkQ2FyZCA9PT0gXCJzdHVkZW50XCIpIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMYWJBdXRoXCIsIFwiWW91IG1heSBzaWduIGludG8gPHRleHQtaGlnaHRsaWdodD5cIiArIHRoaXMuc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFlvdXIgY2FyZCB3aWxsIGJlIHN5bmNlZCB3aGVuIG9ubGluZS5cIilcbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXhwZWN0ZWRDYXJkID09PSBcInN0dWRlbnRcIikgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJZb3UgbWF5IHNpZ24gaW50byA8dGV4dC1oaWdodGxpZ2h0PlwiICsgdGhpcy5zdWJqZWN0ICsgXCI8L3RleHQtaGlnaHRsaWdodD4gaGVyZS4gVG8gc2lnbiBvdXQsIHJlZ2lzdGVyIHlvdXIgY2FyZCBhZ2Fpbi5cIilcbiAgICB9KVxuXG4gICAgdGhpcy5hcnJvdy5vbihcIm1vdXNlZG93blwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuYXJyb3cuY3NzKFwib3BhY2l0eVwiKSA9PT0gMSlcbiAgICAgIGF3YWl0IGFuaW1hdGVkU2Nyb2xsVG8oMzUwLCB7XG4gICAgICAgIGVsZW1lbnRUb1Njcm9sbDogdGhpcy5jYXJkc0NvbnRhaW5lcixcbiAgICAgICAgc3BlZWQ6IDIwMDBcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuY2FuY0J1dHRvbiA9IG5ldyBCdXR0b24oXCJBYm9ydFwiKVxuICAgIHRoaXMuY2FuY0J1dHRvbi5ob3RrZXkgPSBcIkVzY2FwZVwiXG4gICAgdGhpcy5jYW5jQnV0dG9uLmlkID0gXCJjYW5jXCJcbiAgICB0aGlzLmNvbmZCdXR0b24gPSBuZXcgQnV0dG9uKFwiQ29uZmlybVwiKVxuICAgIHRoaXMuY29uZkJ1dHRvbi5pZCA9IFwiY29uZlwiXG4gICAgdGhpcy5jYW5jQnV0dG9uLmRpc2FibGUoKVxuICAgIHRoaXMuY29uZkJ1dHRvbi5kaXNhYmxlKClcbiAgICBcbiAgICB0aGlzLmJ1dHRvbnMgPSBuZXcgRWxlbWVudExpc3QodGhpcy5jYW5jQnV0dG9uLCB0aGlzLmNvbmZCdXR0b24pXG4gICAgY29uc3QgdCA9IHRoaXNcbiAgICB0aGlzLmJ1dHRvbnMuSW5uZXIoXCJhZGRBY3RpdmF0aW9uQ2FsbGJhY2tcIiwgW2FzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgdC5jYW5jQnV0dG9uLmRpc2FibGUoKVxuICAgICAgdC5jb25mQnV0dG9uLmRpc2FibGUoKVxuICAgICAgbGV0IHByb21zOiBhbnkgPSBbZGVsYXkoNjAwKV1cblxuICAgICAgbGV0IGNvbmYgPSB0aGlzID09PSB0LmNvbmZCdXR0b25cblxuICAgICAgXG4gICAgICBwcm9tcy5hZGQodC5idXR0b25Mb2FkaW5nQ2JzLmVhKGFzeW5jIChjYikgPT4ge1xuICAgICAgICBhd2FpdCBjYihjb25mKVxuICAgICAgfSkpXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9tcylcbiAgICAgIHQuYnV0dG9uTG9hZGluZ0Nicy5jbGVhcigpXG4gICAgICBcbiAgICB9LCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodC5jdXJyQnV0dG9uQ2IpIHQuY3VyckJ1dHRvbkNiKHRoaXMgPT09IHQuY29uZkJ1dHRvbilcbiAgICAgIGRlbGV0ZSB0LmN1cnJCdXR0b25DYlxuICAgICAgYXdhaXQgdC5oaWRlQ29uZmltT3B0aW9ucygpXG4gICAgfV0pXG5cbiAgICB0aGlzLm1haW5Cb2R5LmFwZCh0aGlzLmNhbmNCdXR0b24sIHRoaXMuY29uZkJ1dHRvbilcblxuICAgIHRoaXMubWFpbkNhcmQgPSBuZXcgRWR1KClcbiAgICB0aGlzLm1haW5DYXJkLmlkID0gXCJtYWluQ2FyZFwiXG5cbiAgICB0aGlzLmNhcmRzQ29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLm1haW5DYXJkLCB0aGlzLm90aGVyQ2FyZHNDb250YWluZXIpXG5cblxuICAgIGxldCBndWlkZSA9IG5ldyBEYXRhKDApXG4gICAgbGV0IGxhc3RQb3MgPSAwO1xuICAgIHRoaXMuY2FyZHNDb250YWluZXIub24oXCJzY3JvbGxcIiwgKGUpID0+IHtcbiAgICAgIGxldCBwb3MgPSB0aGlzLmNhcmRzQ29udGFpbmVyLnNjcm9sbFRvcFxuXG5cbiAgICAgIGd1aWRlLnZhbCA9IHBvc1xuXG5cbiAgICAgIHRoaXMuY2FuY2VsU2hvd0hvdXJzKClcblxuICAgICAgaWYgKGxhc3RQb3MgPT09IDAgJiYgcG9zID4gMCkge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGgoKSAhPT0gMCkgdGhpcy5hcnJvdy5hbmltKHtvcGFjaXR5OiAwfSkudGhlbigoKSA9PiB0aGlzLmFycm93LmhpZGUoKSlcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudGx5U2hvd2luZ0NvbmZpcm1PcHRpb25zKSB0aGlzLmhpZGVDb25maW1PcHRpb25zKClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxhc3RQb3MgPiAwICYmIHBvcyA9PT0gMCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoKCkgIT09IDApIGlmICh0aGlzLmV4cGVjdGVkQ2FyZCAhPT0gXCJ0ZWFjaGVyXCIpIHRoaXMuYXJyb3cuc2hvdygpLmFuaW0oe29wYWNpdHk6IDF9KVxuICAgICAgfVxuXG4gICAgICBsYXN0UG9zID0gcG9zXG4gICAgfSlcbiAgICBcbiAgICB0aGlzLm90aGVyQ2FyZHNDb250YWluZXIuYW5pbShbe3RyYW5zbGF0ZVk6IDEyNSwgb2Zmc2V0OiAwfSwge3RyYW5zbGF0ZVk6IC4xfV0sIHtzdGFydDogMCwgZW5kOiAzMDB9LCBndWlkZSlcblxuXG5cbiAgICBsaXN0LmZvckVhY2goKGUsIGkpID0+IHtcblxuICAgICAgbGV0IGVkdSA9IG5ldyBFZHUoKVxuICAgICAgXG5cbiAgICAgIGVkdS5jc3MoXCJvcGFjaXR5XCIsIDApXG5cbiAgICAgIGxldCBjdXJyZW50RGF0YSA9IGUuY3VycmVudCgpXG4gICAgICBlLmdldChcInVzZXJuYW1lXCIsICh1c2VybmFtZSkgPT4ge1xuICAgICAgICBlZHUudXNlcm5hbWUodXNlcm5hbWUpXG4gICAgICB9KVxuICAgICAgZS5nZXQoXCJmdWxsTmFtZVwiLCAoZnVsbE5hbWUpID0+IHtcbiAgICAgICAgZWR1LmZ1bGxOYW1lKGZ1bGxOYW1lKVxuICAgICAgfSlcblxuICAgICAgZWR1Lmx1Y2t5RGF5KClcbiAgICAgIGVkdS51cGRhdGVQYXNzY29kZSgpXG4gICAgICBlZHUuZW1wbG95ZWVUeXBlKFwiU3R1ZGVudFwiKVxuICAgICAgdGhpcy5vdGhlckNhcmRzQ29udGFpbmVyLmluc2VydEJlZm9yZShlZHUsIHRoaXMub3RoZXJDYXJkc0NvbnRhaW5lci5jaGlsZHMoKVtpXSlcblxuICAgICAgZWR1LmFuaW0oe29wYWNpdHk6IDF9KVxuXG5cblxuXG4gICAgICBcbiAgICAgIHRoaXMudGFibGVSb290LmFwZChjZShcInRhYmxlLWNvbFwiKS50ZXh0KGN1cnJlbnREYXRhLnVzZXJuYW1lLnZhbCkpXG4gICAgICBsZXQgZW50cnlDb2wgPSBjZShcInRhYmxlLWNvbFwiKVxuICAgICAgdGhpcy50YWJsZVJvb3QuYXBkKGVudHJ5Q29sKVxuXG4gICAgICBlLnJlZihcInJlZ2lzdGVyZWRcIikuYXNBcnJheS5mb3JFYWNoKChyZWcpID0+IHtcbiAgICAgICAgbGV0IGVudHJ5Qm94ID0gY2UoXCJob3VyLWJveFwiKVxuICAgICAgICByZWcuZ2V0KFwiXCIsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGVudHJ5Qm94LmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnlCb3gucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGVudHJ5Q29sLmFwZChlbnRyeUJveClcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgZW50cnlDb2wuaHRtbChcIlwiKVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBlbnRyeUNvbC5jaGlsZHMoKS5jc3MoXCJvcGFjaXR5XCIsIDEpXG4gICAgICB9KVxuICAgICAgXG4gICAgICBcbiAgICAgIFxuICAgIH0sIGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMub3RoZXJDYXJkc0NvbnRhaW5lci5odG1sKFwiXCIpXG4gICAgICB0aGlzLnRhYmxlUm9vdC5odG1sKFwiXCIpXG4gICAgfSlcblxuXG5cbiAgICBjb25zdCB6b29tID0gLjc3XG4gICAgdGhpcy5jYXJkc0NvbnRhaW5lci5vbihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLm1haW5DYXJkLmNzcyhcIm1hcmdpblRvcFwiLCAoKHRoaXMuY2FyZHNDb250YWluZXIuaGVpZ2h0KCkgLSAodGhpcy5tYWluQ2FyZC5oZWlnaHQoKSAqIHpvb20pKSAvIDIpIC8gem9vbSkgXG4gICAgfSlcblxuICAgIFxuICB9XG5cbiAgcHJpdmF0ZSBleHBlY3RlZENhcmQ6IFwic3R1ZGVudFwiIHwgXCJ0ZWFjaGVyXCJcbiAgcHVibGljIGFzeW5jIGV4cGVjdFN0dWRlbnQodGVtcG9yYXJ5OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAoIXRlbXBvcmFyeSkge1xuICAgICAgdGhpcy5zaG93U2Nyb2xsRG93bigpXG4gICAgICB0aGlzLmVuYWJsZVRhYmxlKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmhpZGVTY3JvbGxEb3duKClcbiAgICAgIHRoaXMuZGlzYWJsZVRhYmxlKClcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZXhwZWN0ZWRDYXJkID09PSBcInN0dWRlbnRcIikgcmV0dXJuXG4gICAgaWYgKHRoaXMuZWR1RXhwZWN0ZWRDaGFuZ2VDYikgdGhpcy5lZHVFeHBlY3RlZENoYW5nZUNiKFwic3R1ZGVudFwiKVxuICAgIHRoaXMubWFpbkNhcmQuZW1wbG95ZWVUeXBlKFwiU3R1ZGVudFwiKVxuICAgIHRoaXMuZXhwZWN0ZWRDYXJkID0gXCJzdHVkZW50XCJcbiAgICBhd2FpdCB0aGlzLm1haW5DYXJkLmV4cGVjdFN0dWRlbnQoKVxuICB9XG4gIHB1YmxpYyBhc3luYyBleHBlY3RUZWFjaGVyKCkge1xuICAgIHRoaXMuZXhwZWN0ZWRDYXJkID0gXCJ0ZWFjaGVyXCJcblxuICAgIGlmICh0aGlzLmVkdUV4cGVjdGVkQ2hhbmdlQ2IpIHRoaXMuZWR1RXhwZWN0ZWRDaGFuZ2VDYihcInRlYWNoZXJcIilcbiAgICBcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGF3YWl0IGFuaW1hdGVkU2Nyb2xsVG8oMCwge1xuICAgICAgICBlbGVtZW50VG9TY3JvbGw6IHRoaXMuY2FyZHNDb250YWluZXIsXG4gICAgICAgIHNwZWVkOiAyMDAwLFxuICAgICAgICBjYW5jZWxPblVzZXJBY3Rpb246IGZhbHNlXG4gICAgICB9KVxuICAgICAgYXdhaXQgZGVsYXkoMTAwKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmhpZGVTY3JvbGxEb3duKClcbiAgICB0aGlzLmRpc2FibGVUYWJsZSgpXG4gICAgdGhpcy5tYWluQ2FyZC5lbXBsb3llZVR5cGUoXCJUZWFjaGVyXCIpXG4gICAgYXdhaXQgdGhpcy5tYWluQ2FyZC5leHBlY3RUZWFjaGVyKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2hvd1Njcm9sbERvd24oKSB7XG4gICAgaWYgKHRoaXMubGlzdC5sZW5ndGgoKSAhPT0gMCkge1xuICAgICAgdGhpcy5hcnJvdy5zaG93KClcbiAgICAgIHRoaXMuY2FyZHNDb250YWluZXIuY3NzKFwib3ZlcmZsb3dZXCIsIFwiYXV0b1wiKVxuICAgICAgYXdhaXQgdGhpcy5hcnJvdy5hbmltKHtvcGFjaXR5OiAxfSwgNTAwKVxuICAgIH1cbiAgICBcbiAgfVxuICBwcml2YXRlIGFzeW5jIGhpZGVTY3JvbGxEb3duKCkge1xuICAgIHRoaXMuY2FyZHNDb250YWluZXIuY3NzKFwib3ZlcmZsb3dZXCIsIFwiaGlkZGVuXCIpXG4gICAgYXdhaXQgdGhpcy5hcnJvdy5hbmltKHtvcGFjaXR5OiAwfSwgNTAwKVxuICAgIHRoaXMuYXJyb3cuaGlkZSgpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGVuYWJsZVRhYmxlKCkge1xuICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwib3ZlcmZsb3dYXCIsIFwiYXV0b1wiKVxuICB9XG4gIHByaXZhdGUgYXN5bmMgZGlzYWJsZVRhYmxlKCkge1xuICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwib3ZlcmZsb3dYXCIsIFwiaGlkZGVuXCIpXG4gIH1cblxuICBwcml2YXRlIGN1cnJlbnRseVNob3dpbmdDb25maXJtT3B0aW9ucyA9IGZhbHNlXG4gIHByaXZhdGUgY3VyckJ1dHRvblByb21pc2U6IFByb21pc2U8Ym9vbGVhbj5cbiAgcHJpdmF0ZSBjdXJyQnV0dG9uQ2I6IChjb25maXJtOiBib29sZWFuKSA9PiB2b2lkXG4gIHByaXZhdGUgYnV0dG9uTG9hZGluZ0NiczogKChjb25maXJtOiBib29sZWFuKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPilbXSA9IFtdXG4gIHNob3dDb25maW1PcHRpb25zKGxvYWRpbmdDYj86ICgoY29uZmlybTogYm9vbGVhbikgPT4gdm9pZCB8IFByb21pc2U8dm9pZD4pKSB7XG4gICAgdGhpcy5idXR0b25Mb2FkaW5nQ2JzLmFkZChsb2FkaW5nQ2IpXG4gICAgaWYgKHRoaXMuY3VyckJ1dHRvblByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJCdXR0b25Qcm9taXNlXG4gICAgfVxuICAgIHRoaXMuY3VycmVudGx5U2hvd2luZ0NvbmZpcm1PcHRpb25zID0gdHJ1ZVxuXG4gICAgbGV0IGFuaW1Qcm9tID0gKGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwib3ZlcmZsb3dYXCIsIFwiaGlkZGVuXCIpXG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwic2Nyb2xsU25hcFR5cGVcIiwgXCJub25lXCIpXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGFuaW1hdGVkU2Nyb2xsVG8oMCwge1xuICAgICAgICAgIGVsZW1lbnRUb1Njcm9sbDogdGhpcy5jYXJkc0NvbnRhaW5lcixcbiAgICAgICAgICBzcGVlZDogMjAwMCxcbiAgICAgICAgICBjYW5jZWxPblVzZXJBY3Rpb246IGZhbHNlXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlZFNjcm9sbFRvKFswLCAwXSwge1xuICAgICAgICAgIGVsZW1lbnRUb1Njcm9sbDogdGhpcy5lbGVtZW50Qm9keSxcbiAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICBjYW5jZWxPblVzZXJBY3Rpb246IGZhbHNlXG4gICAgICAgICAgXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwib3ZlcmZsb3dYXCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgdGhpcy5lbGVtZW50Qm9keS5jc3MoXCJzY3JvbGxTbmFwVHlwZVwiLCBcInggbWFuZGF0b3J5XCIpXG4gICAgICAgIH0pXG4gICAgICBdKVxuXG4gICAgICB0aGlzLmJ1dHRvbnMuSW5uZXIoXCJlbmFibGVcIiwgW10pXG4gICAgICBhd2FpdCB0aGlzLmJ1dHRvbnMuc2hvdygpLmFuaW0oe29wYWNpdHk6IDF9KVxuICAgIH0pKClcblxuICAgIHRoaXMuY3VyckJ1dHRvblByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICBhbmltUHJvbS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyQnV0dG9uQ2IgPSAoY29uZikgPT4ge1xuICAgICAgICAgIHRoaXMuZWxlbWVudEJvZHkuY3NzKFwib3ZlcmZsb3dYXCIsIFwiYXV0b1wiKVxuICAgICAgICAgIHJlcyhjb25mKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5jdXJyQnV0dG9uUHJvbWlzZVxuXG4gIH1cbiAgYXN5bmMgaGlkZUNvbmZpbU9wdGlvbnMoKSB7XG4gICAgdGhpcy5jdXJyZW50bHlTaG93aW5nQ29uZmlybU9wdGlvbnMgPSBmYWxzZVxuICAgIGlmICh0aGlzLmN1cnJCdXR0b25DYikgdGhpcy5jdXJyQnV0dG9uQ2IoZmFsc2UpXG4gICAgdGhpcy5idXR0b25Mb2FkaW5nQ2JzLmNsZWFyKClcbiAgICBkZWxldGUgdGhpcy5jdXJyQnV0dG9uUHJvbWlzZVxuICAgIGF3YWl0IHRoaXMuYnV0dG9ucy5hbmltKHtvcGFjaXR5OiAwfSkudGhlbigoKSA9PiB7dGhpcy5idXR0b25zLmhpZGUoKTsgdGhpcy5idXR0b25zLklubmVyKFwiZGlzYWJsZVwiLCBbXSl9KVxuXG4gIH1cblxuICBwcml2YXRlIHNob3dIcnNDYW5jbGVkID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93aW5nSG91cnMgPSBmYWxzZVxuICBhc3luYyBzaG93SG91cnMoZGF0YTogYW55LCBjYXJkSWQ6IHN0cmluZykge1xuICAgIHRoaXMuc2hvd2luZ0hvdXJzID0gdHJ1ZVxuXG4gICAgaWYgKHRoaXMuY2FyZHNDb250YWluZXIuc2Nyb2xsVG9wICE9PSAwKSB7XG4gICAgICBhd2FpdCBhbmltYXRlZFNjcm9sbFRvKDAsIHtcbiAgICAgICAgZWxlbWVudFRvU2Nyb2xsOiB0aGlzLmNhcmRzQ29udGFpbmVyLFxuICAgICAgICBzcGVlZDogMjAwMCxcbiAgICAgICAgY2FuY2VsT25Vc2VyQWN0aW9uOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIGF3YWl0IGRlbGF5KDEwMClcbiAgICB9XG5cbiAgICBsZXQgZWxlbWVudHM6IEVsZW1lbnRMaXN0ID0gbmV3IEVsZW1lbnRMaXN0KClcblxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnJlZ2lzdGVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBob3VyID0gY2UoXCJob3VyLWJveFwiKVxuICAgICAgaWYgKGRhdGEucmVnaXN0ZXJlZFtpXSA9PT0gXCJhY3RpdmVcIikgaG91ci5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgZWxzZSBpZiAoZGF0YS5yZWdpc3RlcmVkW2ldID09PSBcImdvbmVcIikge31cbiAgICAgIGVsc2UgaWYgKGRhdGEucmVnaXN0ZXJlZFtpXSA9PT0gXCJ0b0JlR29uZVwiKSBob3VyLmFkZENsYXNzKFwidG9CZUdvbmVcIilcbiAgICAgIGVsZW1lbnRzLmFkZChob3VyKVxuICAgICAgdGhpcy5ob3Vyc0NvbnRhaW5lci5hcGQoaG91cilcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zaWduID09PSBcImluXCIpIHtcbiAgICAgIHRoaXMubGlzdC5hZGQoe3VzZXJuYW1lOiBkYXRhLnVzZXJuYW1lLCBmdWxsTmFtZTogZGF0YS5mdWxsTmFtZSwgcmVnaXN0ZXJlZDogZGF0YS5yZWdpc3RlcmVkfSlcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZWxlbWVudHMuYW5pbSh7dHJhbnNsYXRlWTogMjF9LCB7ZHVyYXRpb246IDcwMCwgZWFzaW5nfSksXG4gICAgICAgIGVsZW1lbnRzLmFuaW0oe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IDcwMCwgZWFzaW5nOiBcImxpbmVhclwifSwgMTAwKSxcbiAgICAgICAgdGhpcy5tYWluQ2FyZC5hbmltKHt0cmFuc2xhdGVZOiAtMjF9LCB7ZHVyYXRpb246IDcwMCwgZWFzaW5nfSlcbiAgICAgIF0pXG5cbiAgICAgIGlmICh0aGlzLnNob3dIcnNDYW5jbGVkKSByZXR1cm4gdGhpcy5zaG93SHJzQ2FuY2xlZCA9IGZhbHNlXG5cbiAgICAgIGRlbGF5KDYwMCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNob3dIcnNDYW5jbGVkKSByZXR1cm4gdGhpcy5zaG93SHJzQ2FuY2xlZCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNhcmRzQ29udGFpbmVyLnNjcm9sbFRvcCA9PT0gMCkgdGhpcy5leHBlY3RTdHVkZW50KClcbiAgICAgIH0pXG4gICAgICBhd2FpdCBkZWxheSgyNTAwKVxuICAgICAgaWYgKHRoaXMuc2hvd0hyc0NhbmNsZWQpIHJldHVybiB0aGlzLnNob3dIcnNDYW5jbGVkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YS5zaWduID09PSBcIm91dFwiKSB7XG4gICAgICBjYXJkUmVhZGVyLmRpc2FibGUoKVxuICAgICAgXG4gICAgICBsZXQgY29uZmlybVByb206IGFueVxuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGxvZ291dEFmdGVyID0gZGF0YS5yZWdpc3RlcmVkLmxlbmd0aFxuICAgICAgICBkYXRhLnJlZ2lzdGVyZWQuZWEoKGUsIGkpID0+IHtcbiAgICAgICAgICBpZiAoZSA9PT0gXCJ0b0JlR29uZVwiKSByZXR1cm4gbG9nb3V0QWZ0ZXIgPSBpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGxvZ291dEFmdGVyID09PSBkYXRhLnJlZ2lzdGVyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIk5vdGVcIiwgXCJZb3Ugd2lsbCBiZSBzaWduZWQgb3V0IDx0ZXh0LWhpZ2h0bGlnaHQ+YXV0b21hdGljYWxseTwvdGV4dC1oaWdodGxpZ2h0PiBhZnRlciBhIHVuaXQgZW5kcy5cIilcbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBlbGVtZW50cy5hbmltKHt0cmFuc2xhdGVZOiAyMX0sIHtkdXJhdGlvbjogNzAwLCBlYXNpbmd9KSxcbiAgICAgICAgICAgIGVsZW1lbnRzLmFuaW0oe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IDcwMCwgZWFzaW5nOiBcImxpbmVhclwifSwgMTAwKSxcbiAgICAgICAgICAgIHRoaXMubWFpbkNhcmQuYW5pbSh7dHJhbnNsYXRlWTogLTIxfSwge2R1cmF0aW9uOiA3MDAsIGVhc2luZ30pXG4gICAgICAgICAgXSlcbiAgICAgICAgICBjYXJkUmVhZGVyLmVuYWJsZSgpXG4gICAgICAgICAgaWYgKHRoaXMuc2hvd0hyc0NhbmNsZWQpIHJldHVybiB0aGlzLnNob3dIcnNDYW5jbGVkID0gZmFsc2VcbiAgICAgICAgICBhd2FpdCBkZWxheSgzMDAwKVxuICAgICAgICAgIGlmICh0aGlzLnNob3dIcnNDYW5jbGVkKSByZXR1cm4gdGhpcy5zaG93SHJzQ2FuY2xlZCA9IGZhbHNlXG5cbiAgICAgICAgICBcbiAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLm1haW5DYXJkLmFuaW0oe3RyYW5zbGF0ZVk6IC4xfSwge2R1cmF0aW9uOiA4MDAsIGVhc2luZ30pLFxuICAgICAgICAgICAgZWxlbWVudHMuYW5pbSh7dHJhbnNsYXRlWTogLjF9LCB7ZHVyYXRpb246IDgwMCwgZWFzaW5nfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGVsZW1lbnRzLnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgICAgaWYgKHRoaXMuc2hvd0hyc0NhbmNsZWQpIHJldHVybiB0aGlzLnNob3dIcnNDYW5jbGVkID0gZmFsc2VcblxuICAgICAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIllvdSBtYXkgc2lnbiBpbnRvIDx0ZXh0LWhpZ2h0bGlnaHQ+XCIgKyB0aGlzLnN1YmplY3QgKyBcIjwvdGV4dC1oaWdodGxpZ2h0PiBoZXJlLiBUbyBzaWduIG91dCwgcmVnaXN0ZXIgeW91ciBjYXJkIGFnYWluLlwiKVxuICAgICAgICAgIGVsc2UgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJZb3UgbWF5IHNpZ24gaW50byA8dGV4dC1oaWdodGxpZ2h0PlwiICsgdGhpcy5zdWJqZWN0ICsgXCI8L3RleHQtaGlnaHRsaWdodD4gaGVyZS4gWW91ciBjYXJkIHdpbGwgYmUgc3luY2VkIHdoZW4gb25saW5lLlwiKVxuICAgICAgICAgIFxuICAgIFxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxldCBsYXN0UHJlZGV0ZXJtYW50ID0gMFxuICAgICAgICAgIGRhdGEucmVnaXN0ZXJlZC5lYSgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUgPT09IFwiYWN0aXZlXCIgfHwgZSA9PT0gXCJnb25lXCIpIGxhc3RQcmVkZXRlcm1hbnQgPSBpICsgMVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBsZXQgdG90YWxBY3RpdmVTZXNzaW9ucyA9IGxvZ291dEFmdGVyIC0gbGFzdFByZWRldGVybWFudFxuXG4gICAgICAgICAgaWYgKHRvdGFsQWN0aXZlU2Vzc2lvbnMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMb2dvdXRcIiwgXCJZb3UgYXJlIGFib3V0IHRvIHNpZ24gb3V0IG9mIHRoaXMgdW5pdCA8dGV4dC1oaWdodGxpZ2h0PnJpZ2h0IGF3YXk8L3RleHQtaGlnaHRsaWdodD4uIEFyZSB5b3Ugc3VyZT9cIilcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAobG9nb3V0QWZ0ZXIgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMb2dvdXRcIiwgXCJZb3UgYXJlIGFib3V0IHRvIHNpZ24gb3V0IGFmdGVyIHRoZSA8dGV4dC1oaWdodGxpZ2h0PmZpcnN0IGhvdXI8L3RleHQtaGlnaHRsaWdodD4uIEFyZSB5b3Ugc3VyZT9cIilcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTG9nb3V0XCIsIFwiWW91IGFyZSBhYm91dCB0byBzaWduIG91dCBhZnRlciB0aGUgZmlyc3QgPHRleHQtaGlnaHRsaWdodD5cIiArIGxvZ291dEFmdGVyICsgXCIgaG91cnM8L3RleHQtaGlnaHRsaWdodD4uIEFyZSB5b3Ugc3VyZT9cIilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIGNvbmZpcm1Qcm9tID0gdGhpcy5zaG93Q29uZmltT3B0aW9ucygoY29uZmlybSkgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzQnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlybSkge1xuICAgICAgICAgICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwic3R1ZGVudFNpZ25PdXRcIiwge2NhcmRJZH0sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICAgICAgICAgICAgcmVxLmZhaWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpID0gLTFcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QubGlzdCgoZSwgaW5kKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZS5jdXJyZW50KCkudXNlcm5hbWUudmFsID09PSBkYXRhLnVzZXJuYW1lKSBpID0gaW5kXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlSShpKVxuICAgICAgICAgICAgICAgIGNhcmRSZWFkZXIuZW5hYmxlKClcbiAgICAgICAgICAgICAgICByZXNCdXR0b24oKVxuICAgICAgICAgICAgICB9KVxuICBcbiAgICAgICAgICAgICAgYXdhaXQgcmVxXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBsZXQgaSA9IC0xXG4gICAgICAgICAgICAgIHRoaXMubGlzdC5saXN0KChlLCBpbmQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5jdXJyZW50KCkudXNlcm5hbWUudmFsID09PSBkYXRhLnVzZXJuYW1lKSBpID0gaW5kXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmVJKGkpXG4gICAgICAgICAgICAgIHJlc0J1dHRvbigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJlc0J1dHRvbigpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBcbiAgICAgICAgfSlcbiAgXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBlbGVtZW50cy5hbmltKHt0cmFuc2xhdGVZOiAyMX0sIHtkdXJhdGlvbjogNzAwLCBlYXNpbmd9KSxcbiAgICAgICAgICBlbGVtZW50cy5hbmltKHtvcGFjaXR5OiAxfSwge2R1cmF0aW9uOiA3MDAsIGVhc2luZzogXCJsaW5lYXJcIn0sIDEwMCksXG4gICAgICAgICAgdGhpcy5tYWluQ2FyZC5hbmltKHt0cmFuc2xhdGVZOiAtMjF9LCB7ZHVyYXRpb246IDcwMCwgZWFzaW5nfSksXG4gICAgICAgICAgY29uZmlybVByb21cbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICAgIGNhdGNoKGUpIHtcblxuICAgICAgfVxuXG5cbiAgICAgIGNhcmRSZWFkZXIuZW5hYmxlKClcbiAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIllvdSBtYXkgc2lnbiBpbnRvIDx0ZXh0LWhpZ2h0bGlnaHQ+XCIgKyB0aGlzLnN1YmplY3QgKyBcIjwvdGV4dC1oaWdodGxpZ2h0PiBoZXJlLiBUbyBzaWduIG91dCwgcmVnaXN0ZXIgeW91ciBjYXJkIGFnYWluLlwiKVxuICAgICAgICAgIGVsc2UgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJZb3UgbWF5IHNpZ24gaW50byA8dGV4dC1oaWdodGxpZ2h0PlwiICsgdGhpcy5zdWJqZWN0ICsgXCI8L3RleHQtaGlnaHRsaWdodD4gaGVyZS4gWW91ciBjYXJkIHdpbGwgYmUgc3luY2VkIHdoZW4gb25saW5lLlwiKVxuXG4gICAgICBsZXQgY29uZmlybSA9IGF3YWl0IGNvbmZpcm1Qcm9tXG5cbiAgICAgIGlmICh0aGlzLnNob3dIcnNDYW5jbGVkKSByZXR1cm4gdGhpcy5zaG93SHJzQ2FuY2xlZCA9IGZhbHNlXG5cbiAgICAgIGlmIChjb25maXJtKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaG91cnNDb250YWluZXIuY2hpbGRzKFwiLnRvQmVHb25lXCIpLmFuaW0oe2JhY2tncm91bmQ6IFwiI0Q5RDlEOVwifSwgNDAwLCA1MClcbiAgICAgICAgYXdhaXQgZGVsYXkoMzAwKVxuICAgICAgICBkYXRhLnJlZ2lzdGVyZWQuZWEoKGUsIGkpID0+IHtcbiAgICAgICAgICBpZiAoZSA9PT0gXCJ0b0JlR29uZVwiKSBkYXRhLnJlZ2lzdGVyZWRbaV0gPSBcImdvbmVcIlxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaG91cnNDb250YWluZXIuY2hpbGRzKFwiLnRvQmVHb25lXCIpLmFuaW0oe2JhY2tncm91bmQ6IFwiIzc5Qzg2NVwifSwgNDAwLCA1MClcbiAgICAgICAgYXdhaXQgZGVsYXkoMzAwKVxuICAgICAgICBkYXRhLnJlZ2lzdGVyZWQuZWEoKGUsIGkpID0+IHtcbiAgICAgICAgICBpZiAoZSA9PT0gXCJhY3RpdmVcIikgZGF0YS5yZWdpc3RlcmVkW2ldID0gXCJnb25lXCJcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2hvd0hyc0NhbmNsZWQpIHJldHVybiB0aGlzLnNob3dIcnNDYW5jbGVkID0gZmFsc2VcblxuICAgICAgZGVsYXkoNjAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0hyc0NhbmNsZWQpIHJldHVybiB0aGlzLnNob3dIcnNDYW5jbGVkID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY2FyZHNDb250YWluZXIuc2Nyb2xsVG9wID09PSAwICYmIHRoaXMubGlzdC5sZW5ndGgoKSAhPT0gMCkgdGhpcy5leHBlY3RTdHVkZW50KClcbiAgICAgICAgZWxzZSB0aGlzLmhpZGVTY3JvbGxEb3duKClcbiAgICAgIH0pXG4gICAgICBcbiAgICB9XG5cblxuICAgIGVsZW1lbnRzID0gdGhpcy5ob3Vyc0NvbnRhaW5lci5jaGlsZHMoKVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5tYWluQ2FyZC5hbmltKHt0cmFuc2xhdGVZOiAuMX0sIHtkdXJhdGlvbjogODAwLCBlYXNpbmd9KSxcbiAgICAgIGVsZW1lbnRzLmFuaW0oe3RyYW5zbGF0ZVk6IC4xfSwge2R1cmF0aW9uOiA4MDAsIGVhc2luZ30pLnRoZW4oKCkgPT4ge1xuICAgICAgICBlbGVtZW50cy5yZW1vdmUoKVxuICAgICAgfSlcbiAgICBdKVxuICAgIHRoaXMubWFpbkNhcmQudXNlcm5hbWUoXCJcIilcbiAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5rbm93blwiKVxuICAgIHRoaXMubWFpbkNhcmQuY2xlYXJMdWNreURheSgpXG4gICAgdGhpcy5tYWluQ2FyZC51cGRhdGVQYXNzY29kZSgwKVxuXG4gICAgdGhpcy5zaG93aW5nSG91cnMgPSBmYWxzZVxuICAgIHRoaXMuc2hvd0hyc0NhbmNsZWQgPSBmYWxzZVxuICB9XG5cbiAgcHJpdmF0ZSBhbHJlYWR5Q2FuYyA9IGZhbHNlXG4gIGFzeW5jIGNhbmNlbFNob3dIb3VycygpIHtcbiAgICBpZiAodGhpcy5hbHJlYWR5Q2FuYyB8fCAhdGhpcy5zaG93aW5nSG91cnMpIHJldHVyblxuICAgIHRoaXMuYWxyZWFkeUNhbmMgPSB0cnVlXG5cbiAgICB0aGlzLnNob3dIcnNDYW5jbGVkID0gdHJ1ZVxuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5ob3Vyc0NvbnRhaW5lci5jaGlsZHMoKVxuXG4gICAgdGhpcy5tYWluQ2FyZC51c2VybmFtZShcIlwiKVxuICAgIHRoaXMubWFpbkNhcmQuZnVsbE5hbWUoXCJVbmtub3duXCIpXG4gICAgdGhpcy5tYWluQ2FyZC5jbGVhckx1Y2t5RGF5KClcbiAgICB0aGlzLm1haW5DYXJkLnVwZGF0ZVBhc3Njb2RlKDApXG4gICAgaWYgKG5hdmlnYXRvci5vbkxpbmUpIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMYWJBdXRoXCIsIFwiWW91IG1heSBzaWduIGludG8gPHRleHQtaGlnaHRsaWdodD5cIiArIHRoaXMuc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFRvIHNpZ24gb3V0LCByZWdpc3RlciB5b3VyIGNhcmQgYWdhaW4uXCIpXG4gICAgICAgICAgZWxzZSB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIllvdSBtYXkgc2lnbiBpbnRvIDx0ZXh0LWhpZ2h0bGlnaHQ+XCIgKyB0aGlzLnN1YmplY3QgKyBcIjwvdGV4dC1oaWdodGxpZ2h0PiBoZXJlLiBZb3VyIGNhcmQgd2lsbCBiZSBzeW5jZWQgd2hlbiBvbmxpbmUuXCIpXG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLm1haW5DYXJkLmFuaW0oe3RyYW5zbGF0ZVk6IC4xfSwge2R1cmF0aW9uOiAyMDAsIGVhc2luZ30pLFxuICAgICAgZWxlbWVudHMuYW5pbSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogMTAwLCBlYXNpbmd9KS50aGVuKCgpID0+IGVsZW1lbnRzLmhpZGUoKSlcbiAgICBdKVxuXG4gICAgdGhpcy5zaG93aW5nSG91cnMgPSBmYWxzZVxuICAgIHRoaXMuYWxyZWFkeUNhbmMgPSBmYWxzZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUmVxdWVzdChkYXRhOiBhbnksIGVuY3J5cHRlZENhcmRJZDogc3RyaW5nKSB7XG4gICAgbGV0IGV4cGVjdGVkVXNlciA9IHRoaXMuZXhwZWN0ZWRDYXJkXG4gICAgaWYgKGRhdGEuZW1wbG95ZWVUeXBlID09PSBcInRlYWNoZXJcIikge1xuXG4gICAgICAvLyBnb3QgdXNlciB0ZWFjaGVyXG5cbiAgICAgIGlmICgha25vd25Mb2dpbnMudGVhY2hlcltlbmNyeXB0ZWRDYXJkSWRdKSB7XG4gICAgICAgIGtub3duTG9naW5zLnRlYWNoZXJbZW5jcnlwdGVkQ2FyZElkXSA9IGRhdGFcbiAgICAgIH1cbiAgICAgIFxuICAgICAgXG4gICAgICB0aGlzLm1haW5DYXJkLnVzZXJuYW1lKGRhdGEudXNlcm5hbWUpXG4gICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKGRhdGEuZnVsbE5hbWUpXG4gICAgICB0aGlzLm1haW5DYXJkLmx1Y2t5RGF5KClcbiAgICAgIHRoaXMubWFpbkNhcmQudXBkYXRlUGFzc2NvZGUoKVxuICAgICAgYXdhaXQgdGhpcy5leHBlY3RUZWFjaGVyKClcblxuICAgICAgaWYgKGV4cGVjdGVkVXNlciA9PT0gXCJ0ZWFjaGVyXCIpIHtcbiAgICAgICAgLy8gZXhwZWN0ZWQgYW5kIGdvdCB0ZWFjaGVyXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVUZWFjaGVyU2Vzc2lvbikge1xuICAgICAgICAgIC8vIFRlYWNoZXIgc3RhcnQgc2Vzc2lvblxuICAgICAgICAgIHRoaXMuYWN0aXZlVGVhY2hlclNlc3Npb24gPSB0cnVlXG4gICAgICAgICAgaWYgKGRhdGEuc2Vzc0tleSAhPT0gdW5kZWZpbmVkKSBsb2NhbFN0b3JhZ2Uuc2Vzc0tleSA9IGRhdGEuc2Vzc0tleVxuXG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2FkaW5nVGVhY2hlckFuaW1hdGlvbigpXG5cbiAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0UGFuZWwoXCJzZXRVcFBhbmVsXCIsIFwibGVmdFwiKVxuICAgICAgICAgIHRoaXMubWFuYWdlci5zZXRQYW5lbChcInNldFVwQ29uZmlybWF0aW9uUGFuZWxcIiwgXCJyaWdodFwiKVxuXG4gICAgICAgICAgZGVsYXkoMjUwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJNYWluQ2FyZCgpXG4gICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIGRvdWJsZSBsb2dpbiB0ZWFjaGVyXG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2dvdXRUZWFjaGVyQWN0aW9uKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGV4cGVjdGVkIHN0dWRlbnQgYnV0IGdvdCB0ZWFjaGVyXG4gICAgICAgIGF3YWl0IHRoaXMubG9nb3V0VGVhY2hlckFjdGlvbigpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gR290IHVzZXIgc3R1ZGVudFxuXG4gICAgICBcblxuICAgICAgaWYgKCFrbm93bkxvZ2lucy5zdHVkZW50W2VuY3J5cHRlZENhcmRJZF0pIHtcbiAgICAgICAgZGF0YS5zdGFydE9mTGFzdFVuaXQgPSBnZXRDdXJyZW50SG91cigpXG4gICAgICAgIGtub3duTG9naW5zLnN0dWRlbnRbZW5jcnlwdGVkQ2FyZElkXSA9IGRhdGFcbiAgICAgIH1cblxuXG4gICAgICB0aGlzLm1haW5DYXJkLnVzZXJuYW1lKGRhdGEudXNlcm5hbWUpXG4gICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKGRhdGEuZnVsbE5hbWUpXG4gICAgICB0aGlzLm1haW5DYXJkLmx1Y2t5RGF5KClcbiAgICAgIHRoaXMubWFpbkNhcmQudXBkYXRlUGFzc2NvZGUoKVxuICAgICAgXG4gICAgICBcblxuICAgICAgaWYgKGV4cGVjdGVkVXNlciA9PT0gXCJzdHVkZW50XCIpIHtcbiAgICAgICAgLy8gZ290IGFuZCBleHBlY3RlZCBzdHVkZW50IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93SG91cnMoZGF0YSwgZW5jcnlwdGVkQ2FyZElkKVxuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gZXhwZWN0ZWQgdGVhY2hlciBidXQgZ290IHN0dWRlbnRcbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIGF3YWl0IHRoaXMuZXhwZWN0U3R1ZGVudCh0cnVlKVxuICAgICAgICAgIFxuICAgICAgICAgIFxuICAgICAgICBhd2FpdCB0aGlzLm1haW5DYXJkLmFuaW0oe1xuICAgICAgICAgIHRyYW5zbGF0ZVg6IFs2LCAtNiwgNSwgLTUsIDQsIC00LCAzLCAtMywgMiwgLTIsIDEsIC0xLCAwXVxuICAgICAgICB9LCB7ZHVyYXRpb246IDE0MDAsIGVhc2luZ30pXG5cbiAgICAgICAgdGhpcy5tYWluQ2FyZC51c2VybmFtZShcIlwiKVxuICAgICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5rbm93blwiKVxuICAgICAgICB0aGlzLm1haW5DYXJkLmNsZWFyTHVja3lEYXkoKVxuICAgICAgICB0aGlzLm1haW5DYXJkLnVwZGF0ZVBhc3Njb2RlKDApXG4gICAgICAgIGF3YWl0IHRoaXMuZXhwZWN0VGVhY2hlcigpXG4gICAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFjdGl2ZVRlYWNoZXJTZXNzaW9uID0gZmFsc2VcbiAgY2FyZFJlYWRDYWxsYmFjayhjYXJkSWQ6IHN0cmluZykge1xuICAgIGxldCBlbmNyeXB0ZWRDYXJkSWQgPSBTSEEyNTYoY2FyZElkKS50b1N0cmluZygpXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc0NhcmRSZWFkQ2FsbGJhY2spID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuY2FuY2VsU2hvd0hvdXJzKClcbiAgICBhd2FpdCBhbmltYXRlZFNjcm9sbFRvKDAsIHtcbiAgICAgIGVsZW1lbnRUb1Njcm9sbDogdGhpcy5jYXJkc0NvbnRhaW5lcixcbiAgICAgIHNwZWVkOiAyMDAwLFxuICAgICAgY2FuY2VsT25Vc2VyQWN0aW9uOiBmYWxzZVxuICAgIH0pXG4gICAgdGhpcy5oaWRlU2Nyb2xsRG93bigpXG4gICAgdGhpcy5tYWluQ2FyZC5hdXRoZW50aWNhdGlvbigpXG4gICAgXG5cblxuICAgIGxldCByZXEgPSBhamF4LnBvc3QoXCJjYXJkQXV0aFwiLCB7XG4gICAgICBlbmNyeXB0ZWRDYXJkSWRcbiAgICB9LCB1bmRlZmluZWQpXG5cbiAgICByZXEuZmFpbChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkZWxheSgxMjAwKVxuXG4gICAgICBsZXQgY2FyZEtub3duQXNTdHVkZW50ID0gISFrbm93bkxvZ2lucy5zdHVkZW50W2VuY3J5cHRlZENhcmRJZF1cbiAgICAgIGxldCBjYXJkS25vd25Bc1RlYWNoZXIgPSAhIWtub3duTG9naW5zLnRlYWNoZXJbZW5jcnlwdGVkQ2FyZElkXVxuICAgICAgdGhpcy5tYWluQ2FyZC5kb25lQXV0aGVudGljYXRpb24oKVxuXG4gICAgICBpZiAodGhpcy5leHBlY3RlZENhcmQgPT09IFwidGVhY2hlclwiKSB7XG4gICAgICAgIGlmIChjYXJkS25vd25Bc1RlYWNoZXIpIHtcbiAgICAgICAgICByZXEucmVjYWxsKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc2Vzc0tleSkgbG9jYWxTdG9yYWdlLnNlc3NLZXkgPSByZXMuZGF0YS5zZXNzS2V5XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIFxuICAgICAgICB9ICAgICAgIFxuICAgICAgICBpZiAoY2FyZEtub3duQXNTdHVkZW50IHx8IGNhcmRLbm93bkFzVGVhY2hlcikgYXdhaXQgdGhpcy5yZWdpc3RlclJlcXVlc3Qoa25vd25Mb2dpbnMudGVhY2hlcltlbmNyeXB0ZWRDYXJkSWRdLCBlbmNyeXB0ZWRDYXJkSWQpIFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5leHBlY3RlZENhcmQgPT09IFwic3R1ZGVudFwiKSB7XG4gICAgICAgIGxldCByZWNhbGxSZXF1ZXN0ID0gcmVxLnJlY2FsbCgpXG5cbiAgICAgICAgLy8gU3R1ZGVudFxuICAgICAgICBpZiAoY2FyZEtub3duQXNTdHVkZW50KSB7XG4gICAgICAgICAgbGV0IGRhdGEgPSBrbm93bkxvZ2lucy5zdHVkZW50W2VuY3J5cHRlZENhcmRJZF1cbiAgICAgICAgICBsZXQgcmVnRGVmID0gZGF0YS5yZWdpc3RlcmVkICE9PSB1bmRlZmluZWRcblxuICAgICAgICAgIGxldCBmaXJzdEluYWN0aXZlZmllbGRBdFRoZUVuZCA9IDBcbiAgICAgICAgICBpZiAocmVnRGVmKSB7XG4gICAgICAgICAgICBkYXRhLnJlZ2lzdGVyZWQuUmV2ZXJzZSgpLmVhKChlLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlICE9PSBcImdvbmVcIikgcmV0dXJuIGZpcnN0SW5hY3RpdmVmaWVsZEF0VGhlRW5kID0gZGF0YS5yZWdpc3RlcmVkLmxlbmd0aCAtIGlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIFxuICAgICAgICAgIGlmIChyZWdEZWYgJiYgZGF0YS5zdGFydE9mTGFzdFVuaXQgIT09IHVuZGVmaW5lZCAmJiBmaXJzdEluYWN0aXZlZmllbGRBdFRoZUVuZCA9PT0gZGF0YS5yZWdpc3RlcmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGN1cnJUaW1lID0gZ2V0Q3VycmVudEhvdXIoKVxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhcnRPZkxhc3RVbml0IDw9IGN1cnJUaW1lKSB7XG4gICAgICAgICAgICAgIGRhdGEuc2lnbiA9IFwib3V0XCJcblxuICAgICAgICAgICAgICByZWNhbGxSZXF1ZXN0LmFib3J0KClcblxuICAgICAgICAgICAgICBsZXQgdGltZURlbHRhID0gY3VyclRpbWUgLSBkYXRhLnN0YXJ0T2ZMYXN0VW5pdFxuXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aW1lRGVsdGE7IGkgPCBkYXRhLnJlZ2lzdGVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkYXRhLnJlZ2lzdGVyZWRbaV0gPSBcInRvQmVHb25lXCJcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubWFpbkNhcmQuZnVsbE5hbWUoXCJVbmV4cGVjdGVkIEVycm9yXCIpXG4gICAgICAgICAgICAgIGF3YWl0IGRlbGF5KDIwMDApXG4gICAgICAgICAgICAgIHRoaXMubWFpbkNhcmQuZnVsbE5hbWUoXCJVbmtub3duXCIpXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEuc2lnbiA9IFwiaW5cIlxuICAgICAgICAgICAgZGF0YS5yZWdpc3RlcmVkID0gW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXhIb3VyczsgaSsrKSB7XG4gICAgICAgICAgICAgIGRhdGEucmVnaXN0ZXJlZFtpXSA9IFwiYWN0aXZlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG5cbiAgICAgICAgICBhd2FpdCB0aGlzLnJlZ2lzdGVyUmVxdWVzdChkYXRhLCBlbmNyeXB0ZWRDYXJkSWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZWNhbGxSZXF1ZXN0LmFib3J0KClcblxuICAgICAgICBcblxuICAgICAgICBcblxuXG4gICAgICAgIC8vIFRlYWNoZXJcblxuICAgICAgICBpZiAoY2FyZEtub3duQXNUZWFjaGVyKSB7XG4gICAgICAgICAgcmVjYWxsUmVxdWVzdC5hYm9ydCgpXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlclJlcXVlc3Qoa25vd25Mb2dpbnMudGVhY2hlcltlbmNyeXB0ZWRDYXJkSWRdLCBlbmNyeXB0ZWRDYXJkSWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZWNhbGxSZXF1ZXN0LmFib3J0KClcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYXJkS25vd25Bc1N0dWRlbnQgJiYgIWNhcmRLbm93bkFzVGVhY2hlcikge1xuICAgICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5hYmxlIHRvIGF1dGhlbnRpY2F0ZVwiKVxuICAgICAgICBhd2FpdCBkZWxheSgyMDAwKVxuICAgICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5rbm93blwiKVxuICAgICAgfVxuXG4gICAgICByZXNDYXJkUmVhZENhbGxiYWNrKClcbiAgICB9KVxuICAgIFxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtyZXEsIGRlbGF5KDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDEwMDApKV0pXG5cbiAgICBsZXQgcmVzID0gYXdhaXQgcmVxXG5cbiAgICB0aGlzLm1haW5DYXJkLmRvbmVBdXRoZW50aWNhdGlvbigpXG5cbiAgICBpZiAocmVzLmVudHJ5KSB7XG4gICAgICBhd2FpdCB0aGlzLnJlZ2lzdGVyUmVxdWVzdChyZXMuZGF0YSwgZW5jcnlwdGVkQ2FyZElkKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmxvZ2luLmVuY3J5cHRlZENhcmRJZCA9IGVuY3J5cHRlZENhcmRJZFxuICAgICAgdGhpcy5tYW5hZ2VyLnNldFBhbmVsKFwibG9naW5cIiwgXCJsZWZ0XCIpXG4gICAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5rbm93blwiKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmV4cGVjdGVkQ2FyZCA9PT0gXCJzdHVkZW50XCIpIHRoaXMuc2hvd1Njcm9sbERvd24oKVxuICAgIHJlc0NhcmRSZWFkQ2FsbGJhY2soKVxuICAgIH0pICBcbiAgfVxuXG4gIFxuICBwdWJsaWMgc3ViamVjdCA9IFwiVW5rbm93blwiXG4gIHB1YmxpYyBtYXhIb3VycyA9IDBcblxuICBwcml2YXRlIGFzeW5jIGxvZ291dFRlYWNoZXJBY3Rpb24oKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxvZ291dFwiLCBcIllvdSBhcmUgYWJvdXQgdG8gbG9nIG91dCBvZiwgaGVuY2UgdGVybWluYXRlIHRoaXMgc2Vzc2lvbi4gQXJlIHlvdSBzdXJlP1wiKVxuICAgIGxldCBjb25maXJtID0gYXdhaXQgdGhpcy5zaG93Q29uZmltT3B0aW9ucygoY29uZmlybSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNCdXR0b24pID0+IHtcbiAgICAgICAgaWYgKGNvbmZpcm0pIHtcbiAgICAgICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwiZGVzdHJveVNlc3Npb25cIiwge30sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgXG4gICAgICAgICAgcmVxLmZhaWwoKCkgPT4ge1xuICAgICAgICAgICAgd2hpbGUodGhpcy5saXN0Lmxlbmd0aCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmVJKDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4ga25vd25Mb2dpbnMuc3R1ZGVudCkge1xuICAgICAgICAgICAgICBkZWxldGUga25vd25Mb2dpbnMuc3R1ZGVudFtrZXldLnJlZ2lzdGVyZWRcbiAgICAgICAgICAgICAgZGVsZXRlIGtub3duTG9naW5zLnN0dWRlbnRba2V5XS5zdGFydE9mTGFzdFVuaXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc0J1dHRvbigpXG4gICAgICAgICAgfSlcbiAgXG4gICAgICAgICAgYXdhaXQgcmVxXG4gICAgICAgICAgd2hpbGUodGhpcy5saXN0Lmxlbmd0aCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlSSgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBrZXkgaW4ga25vd25Mb2dpbnMuc3R1ZGVudCkge1xuICAgICAgICAgICAgZGVsZXRlIGtub3duTG9naW5zLnN0dWRlbnRba2V5XS5yZWdpc3RlcmVkXG4gICAgICAgICAgICBkZWxldGUga25vd25Mb2dpbnMuc3R1ZGVudFtrZXldLnN0YXJ0T2ZMYXN0VW5pdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXNCdXR0b24oKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmVzQnV0dG9uKClcbiAgICAgIH0pXG4gICAgfSlcbiAgICBpZiAoY29uZmlybSkge1xuXG4gICAgICBkZWxldGUgbG9jYWxTdG9yYWdlLnNlc3NLZXlcbiAgICAgIHRoaXMuYWN0aXZlVGVhY2hlclNlc3Npb24gPSBmYWxzZVxuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguc2V0VXBDb25maXJtYXRpb25QYW5lbC5kZXN0cm95U2Vzc2lvblRpbWVvdXQpXG4gICAgICBcbiAgICAgIHRoaXMuY2xlYXJNYWluQ2FyZCgpXG4gICAgICB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIkEgdGVhY2hlciBtYXkgbG9nIGluIHdpdGggaGlzIGVkdS5jYXJkIHRvIHN0YXJ0IHRoZSBzZXNzaW9uLlwiKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuY2xlYXJNYWluQ2FyZCgpXG4gICAgICBhd2FpdCB0aGlzLmV4cGVjdFN0dWRlbnQoKVxuICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUpIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMYWJBdXRoXCIsIFwiWW91IG1heSBzaWduIGludG8gPHRleHQtaGlnaHRsaWdodD5cIiArIHRoaXMuc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFRvIHNpZ24gb3V0LCByZWdpc3RlciB5b3VyIGNhcmQgYWdhaW4uXCIpXG4gICAgICBlbHNlIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMYWJBdXRoXCIsIFwiWW91IG1heSBzaWduIGludG8gPHRleHQtaGlnaHRsaWdodD5cIiArIHRoaXMuc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFlvdXIgY2FyZCB3aWxsIGJlIHN5bmNlZCB3aGVuIG9ubGluZS5cIilcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyTWFpbkNhcmQoZXhwZWN0ZWQ6IFwic3R1ZGVudFwiIHwgXCJ0ZWFjaGVyXCIgPSB0aGlzLmV4cGVjdGVkQ2FyZCkge1xuICAgIHRoaXMubWFpbkNhcmQudXNlcm5hbWUoXCJcIilcbiAgICB0aGlzLm1haW5DYXJkLnVwZGF0ZVBhc3Njb2RlKDApXG4gICAgdGhpcy5tYWluQ2FyZC5jbGVhckx1Y2t5RGF5KClcbiAgICB0aGlzLm1haW5DYXJkLmVtcGxveWVlVHlwZShleHBlY3RlZClcbiAgICB0aGlzLm1haW5DYXJkLmZ1bGxOYW1lKFwiVW5rbm93blwiKVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkaW5nQmFyID0gdGhpcy5xKFwibG9hZGluZy1iYXJcIilcbiAgcHJpdmF0ZSBsb2FkaW5nUHJvZ3Jlc3MgPSB0aGlzLmxvYWRpbmdCYXIuY2hpbGRzKFwibG9hZGluZy1wcm9ncmVzc1wiKVxuICBwcml2YXRlIGFzeW5jIGxvYWRpbmdUZWFjaGVyQW5pbWF0aW9uKCkge1xuICAgIHRoaXMubG9hZGluZ0Jhci5jc3MoXCJvcGFjaXR5XCIsIDEpXG4gICAgbGV0IHByb20gPSBQcm9taXNlLmFsbChbXG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5hbmltKHt0cmFuc2xhdGVZOiA4NX0sIHtkdXJhdGlvbjogOTAwLCBlYXNpbmd9KSxcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLmFuaW0oe29wYWNpdHk6IDF9LCB7ZHVyYXRpb246IDkwMCwgZWFzaW5nOiBcImxpbmVhclwifSwgMTAwKSxcbiAgICAgICAgdGhpcy5tYWluQ2FyZC5hbmltKHt0cmFuc2xhdGVZOiAtMjF9LCB7ZHVyYXRpb246IDkwMCwgZWFzaW5nfSlcbiAgICAgIF0pLFxuICAgICAgZGVsYXkoNTUwKS50aGVuKCgpID0+IFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5sb2FkaW5nUHJvZ3Jlc3MuYW5pbShbXG4gICAgICAgICAge3dpZHRoOiBcIjMwJVwiLCBvZmZzZXQ6IC4zfSxcbiAgICAgICAgICB7d2lkdGg6IFwiNDAlXCIsIG9mZnNldDogLjU1NX0sXG4gICAgICAgICAge3dpZHRoOiBcIjc0JVwiLCBvZmZzZXQ6IC44fSxcbiAgICAgICAgICB7d2lkdGg6IFwiMTAwJVwifVxuICAgICAgICBdLCB7ZHVyYXRpb246IDE3MDB9KSxcbiAgICAgICAgZGVsYXkoNTApXG4gICAgICBdKSlcbiAgICBdKVxuICAgIHByb20udGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmxvYWRpbmdCYXIuYW5pbSh7dHJhbnNsYXRlWTogODV9LCB7ZHVyYXRpb246IDkwMCwgZWFzaW5nfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5jc3MoXCJvcGFjaXR5XCIsIDApXG4gICAgICAgIHRoaXMubG9hZGluZ1Byb2dyZXNzLmNzcyhcIndpZHRoXCIsIFwiMCVcIilcbiAgICAgIH0pXG4gICAgICB0aGlzLm1haW5DYXJkLmFuaW0oe3RyYW5zbGF0ZVk6IC4xfSwge2R1cmF0aW9uOiA5MDAsIGVhc2luZ30pXG4gICAgfSlcblxuXG4gICAgYXdhaXQgcHJvbVxuICAgIFxuICB9XG5cbiAgc3RsKCkge1xuICAgIHJldHVybiBzdXBlci5zdGwoKSArIHJlcXVpcmUoXCIuL2VkdVBhbmVsLmNzc1wiKS50b1N0cmluZygpXG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9lZHVQYW5lbC5wdWdcIikuZGVmYXVsdFxuICB9XG59XG5cbi8vQHRzLWlnbm9yZVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYy1lZHUtcGFuZWwnLCBFZHVQYW5lbCk7IiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZm9ybVBhbmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCI8dGV4dC1jb25hdGluZXI+IDx0ZXh0LWhlYWRpbmc+PC90ZXh0LWhlYWRpbmc+PHRleHQtcGFyYWdyYXBoPjwvdGV4dC1wYXJhZ3JhcGg+PGJvdHRvbS1zdHJpcGU+PC9ib3R0b20tc3RyaXBlPjwvdGV4dC1jb25hdGluZXI+XCI7IiwiaW1wb3J0IFBhbmVsIGZyb20gXCIuLi9wYW5lbFwiXG5pbXBvcnQgUGFuZWxNYW5hZ2VyIGZyb20gXCIuLi8uLi9wYW5lbE1hbmFnZXIvcGFuZWxNYW5hZ2VyXCJcbmltcG9ydCBkZWxheSBmcm9tIFwiZGVsYXlcIlxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb3JtUGFuZWwgZXh0ZW5kcyBQYW5lbCB7XG4gIHB1YmxpYyBwcmVmZXJlZFdpZHRoOiBcInNtYWxsXCIgPSBcInNtYWxsXCJcblxuICBcbiAgcHJpdmF0ZSBoZWFkaW5nRWxlbSA9IHRoaXMucShcInRleHQtaGVhZGluZ1wiKS5maXJzdFxuICBwcml2YXRlIGNvbnRlbnRFbGVtID0gdGhpcy5xKFwidGV4dC1wYXJhZ3JhcGhcIikuZmlyc3RcbiAgY29uc3RydWN0b3IobWFuYWdlcjogUGFuZWxNYW5hZ2VyLCBoZWFkaW5nOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMudXBkYXRlQ29udGVudHMoaGVhZGluZywgY29udGVudClcbiAgfVxuICBhc3luYyB1cGRhdGVDb250ZW50cyhoZWFkaW5nOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgIGxldCBwcm9tcyA9IFtdXG5cbiAgICBpZiAoaGVhZGluZyAhPT0gdGhpcy5oZWFkaW5nRWxlbS5odG1sKCkpIHtcbiAgICAgIHByb21zLmFkZCh0aGlzLmZvcmNlSGVhZGluZyhoZWFkaW5nKSlcbiAgICAgIGlmIChjb250ZW50ICE9PSB0aGlzLmNvbnRlbnRFbGVtLmh0bWwoKSkgcHJvbXMuYWRkKGRlbGF5KDMwKS50aGVuKCgpID0+IHRoaXMuZm9yY2VDb250ZW50KGNvbnRlbnQpKSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoY29udGVudCAhPT0gdGhpcy5jb250ZW50RWxlbS5odG1sKCkpIHByb21zLmFkZCh0aGlzLmZvcmNlQ29udGVudChjb250ZW50KSlcbiAgICB9XG4gICAgXG4gICAgXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbXMpXG4gIH1cbiAgYXN5bmMgaGVhZGluZyh0bzogc3RyaW5nKSB7XG4gICAgaWYgKHRvID09PSB0aGlzLmhlYWRpbmdFbGVtLmh0bWwoKSkgcmV0dXJuXG4gICAgYXdhaXQgdGhpcy5mb3JjZUhlYWRpbmcodG8pXG4gIH1cbiAgYXN5bmMgY29udGVudCh0bzogc3RyaW5nKSB7XG4gICAgaWYgKHRvID09PSB0aGlzLmNvbnRlbnRFbGVtLmh0bWwoKSkgcmV0dXJuXG4gICAgYXdhaXQgdGhpcy5mb3JjZUNvbnRlbnQodG8pXG4gIH1cbiAgYXN5bmMgZm9yY2VIZWFkaW5nKHRvOiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLmhlYWRpbmdFbGVtLmFuaW0oe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDN9KVxuICAgIHRoaXMuaGVhZGluZ0VsZW0uY3NzKHt0cmFuc2xhdGVYOiAtM30pXG4gICAgdGhpcy5oZWFkaW5nRWxlbS5odG1sKHRvKVxuICAgIGF3YWl0IHRoaXMuaGVhZGluZ0VsZW0uYW5pbSh7b3BhY2l0eTogMSwgdHJhbnNsYXRlWDogMC4xfSlcbiAgfVxuICBhc3luYyBmb3JjZUNvbnRlbnQodG86IHN0cmluZykge1xuICAgIGF3YWl0IHRoaXMuY29udGVudEVsZW0uYW5pbSh7b3BhY2l0eTogMCwgdHJhbnNsYXRlWDogM30pXG4gICAgdGhpcy5jb250ZW50RWxlbS5jc3Moe3RyYW5zbGF0ZVg6IC0zfSlcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmh0bWwodG8pXG4gICAgYXdhaXQgdGhpcy5jb250ZW50RWxlbS5hbmltKHtvcGFjaXR5OiAxLCB0cmFuc2xhdGVYOiAwLjF9KVxuICB9XG5cblxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHN1cGVyLnN0bCgpICsgcmVxdWlyZShcIi4vaW5mb3JtUGFuZWwuY3NzXCIpLnRvU3RyaW5nKClcbiAgfVxuICBwdWcoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL2luZm9ybVBhbmVsLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLWluZm9ybS1wYW5lbCcsIEluZm9ybVBhbmVsKTsiLCJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbG9naW5QYW5lbC5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICIsImV4cG9ydCBkZWZhdWx0IFwiPHRleHQtY29uYXRpbmVyPiA8dGV4dC1oZWFkaW5nPkxvZ2luPC90ZXh0LWhlYWRpbmc+PGMtaW5wdXQgcGxhY2Vob2xkZXI9XFxcIlVzZXJuYW1lXFxcIj48L2MtaW5wdXQ+PGMtaW5wdXQgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCI+PC9jLWlucHV0PjwvdGV4dC1jb25hdGluZXI+XCI7IiwiaW1wb3J0IFBhbmVsIGZyb20gXCIuLi9wYW5lbFwiXG5pbXBvcnQgXCIuLi8uLi9pbnB1dC9pbnB1dFwiXG5pbXBvcnQgUGFuZWxNYW5hZ2VyIGZyb20gXCIuLi8uLi9wYW5lbE1hbmFnZXIvcGFuZWxNYW5hZ2VyXCJcbmltcG9ydCB7IEVsZW1lbnRMaXN0IH0gZnJvbSBcImV4dGVuZGVkLWRvbVwiXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4uLy4uL2lucHV0L2lucHV0XCJcbmltcG9ydCBhamF4IGZyb20gXCIuLi8uLi8uLi9saWIvYWpheFwiXG5pbXBvcnQgZGVsYXkgZnJvbSBcImRlbGF5XCJcbmltcG9ydCB7IGRpc2FibGUsIGVuYWJsZSB9IGZyb20gXCIuLi8uLi8uLi9saWIvY2FyZFJlYWRlclwiXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblBhbmVsIGV4dGVuZHMgUGFuZWwge1xuICBwdWJsaWMgcHJlZmVyZWRXaWR0aDogXCJzbWFsbFwiID0gXCJzbWFsbFwiXG4gIHB1YmxpYyBwcmV2ZW50Rm9jdXNJbnRlcmZlcmVuY2UgPSB0cnVlXG5cblxuICBwcml2YXRlIGlucHV0cyA9IHRoaXMucShcImMtaW5wdXRcIikgYXMgRWxlbWVudExpc3Q8SW5wdXQ+XG4gIHByaXZhdGUgdXNyID0gdGhpcy5pbnB1dHMuZmlyc3RcbiAgcHJpdmF0ZSBwd2QgPSB0aGlzLmlucHV0c1sxXVxuXG4gIHB1YmxpYyBlbmNyeXB0ZWRDYXJkSWQgPSBcIlwiXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBQYW5lbE1hbmFnZXIpIHtcbiAgICBzdXBlcigpXG5cbiAgICBsZXQgaW52YWxpZCA9IGZhbHNlXG4gICAgbGV0IHN1Ym1pdENiID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dHMuSW5uZXIoXCJkaXNhYmxlXCIsIFtdKVxuICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5tYWluQ2FyZC5hdXRoZW50aWNhdGlvbigpXG4gICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwiTERBUEF1dGhcIiwge3VzZXJuYW1lOiB0aGlzLnVzci52YWx1ZSwgcGFzc3dvcmQ6IHRoaXMucHdkLnZhbHVlfSlcblxuICAgICAgcmVxLmZhaWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguZWR1Lm1haW5DYXJkLmRvbmVBdXRoZW50aWNhdGlvbigpXG4gICAgICAgIGF3YWl0IG1hbmFnZXIuc2V0UGFuZWwoXCJpbmZvXCIsIFwibGVmdFwiKVxuICAgICAgICB0aGlzLmlucHV0cy5Jbm5lcihcImVuYWJsZVwiLCBbXSlcbiAgICAgIH0pXG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtyZXEsIGRlbGF5KDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDEwMDApKV0pXG5cbiAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5lZHUubWFpbkNhcmQuZG9uZUF1dGhlbnRpY2F0aW9uKClcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcVxuICAgICAgaWYgKHJlcy52YWxpZCkge1xuICAgICAgICBkaXNhYmxlKClcbiAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5yZWdpc3RlclJlcXVlc3QocmVzLmRhdGEsIHRoaXMuZW5jcnlwdGVkQ2FyZElkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBlbmFibGUoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGF3YWl0IG1hbmFnZXIuc2V0UGFuZWwoXCJpbmZvXCIsIFwibGVmdFwiKVxuICAgICAgICB0aGlzLmlucHV0cy5lYSgoaW5wdXQpID0+IHtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5pbnB1dHMuSW5uZXIoXCJlbmFibGVcIiwgW10pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnB1dHMuSW5uZXIoXCJzaG93SW52YWxpZGF0aW9uXCIsIFtcIlVzZXJuYW1lIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdC5cIl0pXG4gICAgICAgIHRoaXMuaW5wdXRzLklubmVyKFwiZW5hYmxlXCIsIFtdKVxuICAgICAgICBpbnZhbGlkID0gdHJ1ZVxuICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguZWR1Lm1haW5DYXJkLmZ1bGxOYW1lKFwiQXV0aGVudGljYXRpb24gZmFpbGVkXCIpXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0cy5Jbm5lcihcIm9uSW5wdXRcIiwgWygpID0+IHtcbiAgICAgIGlmIChpbnZhbGlkKSB7XG4gICAgICAgIHRoaXMuaW5wdXRzLklubmVyKFwic2hvd0ludmFsaWRhdGlvblwiLCBbZmFsc2VdKVxuICAgICAgICBpbnZhbGlkID0gZmFsc2VcbiAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5tYWluQ2FyZC5mdWxsTmFtZShcIlVua25vd25cIilcbiAgICAgIH1cbiAgICB9XSlcbiAgICBcbiAgICB0aGlzLmlucHV0cy5lYSgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0LnN1Ym1pdENhbGxiYWNrID0gc3VibWl0Q2JcbiAgICB9KVxuICAgIHRoaXMudXNyLm9uSW5wdXQoKHYpID0+IHtcbiAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5lZHUubWFpbkNhcmQudXNlcm5hbWUodiBhcyBzdHJpbmcpXG4gICAgfSlcbiAgICB0aGlzLnB3ZC5vbklucHV0KCh2KSA9PiB7XG4gICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguZWR1Lm1haW5DYXJkLnVwZGF0ZVBhc3Njb2RlKCh2IGFzIHN0cmluZykubGVuZ3RoKVxuICAgIH0pXG4gIH1cblxuICBhY3RpdmF0aW9uQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuYWN0aXZhdGlvbkNhbGxiYWNrKClcblxuICAgIHRoaXMudXNyLmZvY3VzKClcbiAgfVxuXG4gIHN0bCgpIHtcbiAgICByZXR1cm4gc3VwZXIuc3RsKCkgKyByZXF1aXJlKFwiLi9sb2dpblBhbmVsLmNzc1wiKS50b1N0cmluZygpXG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9sb2dpblBhbmVsLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLWxvZ2luLXBhbmVsJywgTG9naW5QYW5lbCk7IiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhbmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCJcIjsiLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiXG5cblxudHlwZSBQZXJjZW50ID0gbnVtYmVyXG5pbXBvcnQgKiBhcyBjYXJkUmVhZGVyIGZyb20gXCIuLi8uLi9saWIvY2FyZFJlYWRlclwiXG5cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUGFuZWwgZXh0ZW5kcyBFbGVtZW50IHtcbiAgcHVibGljIGFic3RyYWN0IHByZWZlcmVkV2lkdGg6IFwiYmlnXCIgfCBcInNtYWxsXCIgfCBQZXJjZW50XG4gIHByb3RlY3RlZCBhY3RpdmU6IGJvb2xlYW5cblxuICBwdWJsaWMgcHJldmVudEZvY3VzSW50ZXJmZXJlbmNlID0gZmFsc2VcblxuICBwdWJsaWMgd2FudHNDYXJkUmVhZGVyOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcblxuICAgIFxuICAgIGlmICh0aGlzLmNhcmRSZWFkQ2FsbGJhY2sgIT09IGRlZmF1bHRDYXJkUmVhZENhbGxiYWNrKSB7XG4gICAgICBjYXJkUmVhZGVyLmFkZExpc3RlbmVyKHRoaXMuY2FyZFJlYWRDYWxsYmFjay5iaW5kKHRoaXMpKVxuICAgICAgdGhpcy53YW50c0NhcmRSZWFkZXIgPSB0cnVlXG4gICAgfVxuICAgIGVsc2UgdGhpcy53YW50c0NhcmRSZWFkZXIgPSBmYWxzZVxuICB9XG5cbiAgcHVibGljIGFjdGl2YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGlvbkNhbGxiYWNrKClcbiAgfVxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGlvbkNhbGxiYWNrKClcbiAgfVxuICBwdWJsaWMgdmF0ZShhY3RpdmF0ZTogYm9vbGVhbikge1xuICAgIGlmIChhY3RpdmF0ZSkgdGhpcy5hY3RpdmF0ZSgpXG4gICAgZWxzZSB0aGlzLmRlYWN0aXZhdGUoKVxuICB9XG4gIHByb3RlY3RlZCBhY3RpdmF0aW9uQ2FsbGJhY2soKSB7XG5cbiAgfVxuICBwcm90ZWN0ZWQgZGVhY3RpdmF0aW9uQ2FsbGJhY2soKSB7XG5cbiAgfVxuXG4gIHByb3RlY3RlZCBjYXJkUmVhZENhbGxiYWNrKGNhcmRJZDogc3RyaW5nKSB7XG4gICAgXG4gIH1cblxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL3BhbmVsLmNzc1wiKS50b1N0cmluZygpXG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9wYW5lbC5wdWdcIikuZGVmYXVsdFxuICB9XG59XG5cbi8vQHRzLWlnbm9yZVxubGV0IGRlZmF1bHRDYXJkUmVhZENhbGxiYWNrID0gUGFuZWwucHJvdG90eXBlLmNhcmRSZWFkQ2FsbGJhY2sgPSBmdW5jdGlvbihjYXJkSWQ6IHN0cmluZykge1xuXG59XG5cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLXBhbmVsJywgUGFuZWwpOyIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zZXRVcENvbmZpcm1hdGlvblBhbmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCI8dGV4dC1jb25hdGluZXI+PHRleHQtaGVhZGluZz5Db25maXJtPC90ZXh0LWhlYWRpbmc+PHRleHQtY29udGVudD5JIGFtIGN1cnJlbnRseSB0ZWFjaGluZyA8c3ViamVjdC10ZXh0IGNsYXNzPVxcXCJoaWdodGxpZ2h0XFxcIiBzdHlsZT1cXFwibWF4LXdpZHRoOiA4M3B4XFxcIj5ubyBzdWJqZWN0PC9zdWJqZWN0LXRleHQ+IGluIDxjbGFzc3Jvb20tdGV4dCBjbGFzcz1cXFwiaGlnaHRsaWdodFxcXCIgc3R5bGU9XFxcIm1heC13aWR0aDogMTA1cHhcXFwiPm5vIGNsYXNzcm9vbTwvY2xhc3Nyb29tLXRleHQ+IGZvciA8aG91cnMtdGV4dCBjbGFzcz1cXFwiaGlnaHRsaWdodFxcXCIgc3R5bGU9XFxcIm1pbi13aWR0aDogMTFweDsgbWF4LXdpZHRoOiA1MHB4XFxcIj4wPC9ob3Vycy10ZXh0PiBob3Vycy48L3RleHQtY29udGVudD48L3RleHQtY29uYXRpbmVyPlwiOyIsImltcG9ydCBQYW5lbCBmcm9tIFwiLi4vcGFuZWxcIlxuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi4vLi4vX2J1dHRvbi9fcmlwcGxlQnV0dG9uL2Jsb2NrQnV0dG9uL2Jsb2NrQnV0dG9uXCJcbmltcG9ydCBQYW5lbE1hbmFnZXIgZnJvbSBcIi4uLy4uL3BhbmVsTWFuYWdlci9wYW5lbE1hbmFnZXJcIlxuaW1wb3J0IGRlbGF5IGZyb20gXCJkZWxheVwiXG5pbXBvcnQgYWpheCBmcm9tIFwiLi4vLi4vLi4vbGliL2FqYXhcIlxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0VXBDb25maXJtYXRpb25QYW5lbCBleHRlbmRzIFBhbmVsIHtcbiAgcHVibGljIHByZWZlcmVkV2lkdGggPSAyMFxuXG4gIFxuICBwcml2YXRlIHN1YmplY3RFbGVtID0gdGhpcy5xKFwic3ViamVjdC10ZXh0XCIpLmZpcnN0XG4gIHByaXZhdGUgY2xhc3NSb29tRWxlbSA9IHRoaXMucShcImNsYXNzcm9vbS10ZXh0XCIpLmZpcnN0XG4gIHByaXZhdGUgaG91cnNFbGVtID0gdGhpcy5xKFwiaG91cnMtdGV4dFwiKS5maXJzdFxuXG4gIHB1YmxpYyBkZXN0cm95U2Vzc2lvblRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0XG5cbiAgcHJpdmF0ZSBjb25maXJtQnV0dG9uOiBCdXR0b25cbiAgcHJpdmF0ZSBhYm9ydEJ1dHRvbjogQnV0dG9uXG4gIGNvbnN0cnVjdG9yKG1hbmFnZXI6IFBhbmVsTWFuYWdlcikge1xuICAgIHN1cGVyKClcblxuXG4gICAgdGhpcy5hYm9ydEJ1dHRvbiA9IG5ldyBCdXR0b24oXCJBYm9ydFwiKS5hZGRDbGFzcyhcImFib3J0XCIpXG4gICAgdGhpcy5hYm9ydEJ1dHRvbi5ob3RrZXkgPSBcIkVzY2FwZVwiXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gbmV3IEJ1dHRvbihcIlN1cmVcIikuYWRkQ2xhc3MoXCJjb25maXJtXCIpXG5cbiAgICB0aGlzLmFib3J0QnV0dG9uLmFkZEFjdGl2YXRpb25DYWxsYmFjaygoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc0J1dHRvbikgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGlzYWJsZSgpXG4gICAgICAgIGxldCByZXEgPSBhamF4LnBvc3QoXCJkZXN0cm95U2Vzc2lvblwiLCB7fSwgdW5kZWZpbmVkLCB0cnVlKVxuICAgICAgICByZXEuZmFpbCgoKSA9PiB7XG4gICAgICAgICAgZGVsZXRlIGxvY2FsU3RvcmFnZS5zZXNzS2V5XG4gICAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5hY3RpdmVUZWFjaGVyU2Vzc2lvbiA9IGZhbHNlXG4gICAgICAgICAgZGVsYXkoNTAwKS50aGVuKHJlc0J1dHRvbilcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2RlbGF5KDYwMCksIHJlcV0pXG4gICAgICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2Uuc2Vzc0tleVxuICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguZWR1LmFjdGl2ZVRlYWNoZXJTZXNzaW9uID0gZmFsc2VcbiAgICAgICAgcmVzQnV0dG9uKClcbiAgICAgIH0pXG4gICAgICBcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIkEgdGVhY2hlciBtYXkgbG9nIGluIHdpdGggaGlzIGVkdS5jYXJkIHRvIHN0YXJ0IHRoZSBzZXNzaW9uLlwiKVxuICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5leHBlY3RUZWFjaGVyKClcbiAgICAgIG1hbmFnZXIuc2V0UGFuZWwoXCJpbmZvXCIsIFwibGVmdFwiKVxuICAgICAgbWFuYWdlci5zZXRQYW5lbChcImVkdVwiLCBcInJpZ2h0XCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZW5hYmxlKClcbiAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LnNldFVwUGFuZWwucmVzZXRJbnB1dHMoKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmFkZEFjdGl2YXRpb25DYWxsYmFjaygoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc0J1dHRvbikgPT4ge1xuICAgICAgICB0aGlzLmFib3J0QnV0dG9uLmRpc2FibGUoKVxuXG4gICAgICAgIGxldCBob3VycyA9ICt0aGlzLmhvdXJzRWxlbS50ZXh0KClcblxuICAgICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwic3RhcnRVbml0XCIsIHtcbiAgICAgICAgICBob3VycyxcbiAgICAgICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3RFbGVtLnRleHQoKSxcbiAgICAgICAgICBjbGFzc3Jvb206IHRoaXMuY2xhc3NSb29tRWxlbS50ZXh0KClcbiAgICAgICAgfSwgdW5kZWZpbmVkLCB0cnVlKVxuICAgICAgICBcbiAgICAgICAgcmVxLmZhaWwoKCkgPT4ge1xuICAgICAgICAgIGRlbGF5KDUwMCkudGhlbihyZXNCdXR0b24pXG5cblxuICAgICAgICAgIHRoaXMuZGVzdHJveVNlc3Npb25UaW1lb3V0ID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwiZGVzdHJveVNlc3Npb25cIiwge30sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgXG4gICAgICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJBIHRlYWNoZXIgbWF5IGxvZyBpbiB3aXRoIGhpcyBlZHUuY2FyZCB0byBzdGFydCB0aGUgc2Vzc2lvbi5cIilcbiAgICAgICAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5lZHUuZXhwZWN0VGVhY2hlcigpXG4gICAgICAgICAgICBtYW5hZ2VyLnNldFBhbmVsKFwiaW5mb1wiLCBcImxlZnRcIilcbiAgICAgICAgICAgIG1hbmFnZXIuc2V0UGFuZWwoXCJlZHVcIiwgXCJyaWdodFwiKVxuICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVsZXRlIGxvY2FsU3RvcmFnZS5zZXNzS2V5XG4gICAgICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguZWR1LmFjdGl2ZVRlYWNoZXJTZXNzaW9uID0gZmFsc2VcbiAgXG4gIFxuICAgICAgICAgIH0sIGhvdXJzICogNjAgKiA2MCAqIDEwMDApXG4gICAgICAgIH0pXG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW2RlbGF5KDYwMCksIHJlcV0pXG5cbiAgICAgICAgdGhpcy5kZXN0cm95U2Vzc2lvblRpbWVvdXQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgcmVxID0gYWpheC5wb3N0KFwiZGVzdHJveVNlc3Npb25cIiwge30sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgXG4gICAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmluZm8udXBkYXRlQ29udGVudHMoXCJMYWJBdXRoXCIsIFwiQSB0ZWFjaGVyIG1heSBsb2cgaW4gd2l0aCBoaXMgZWR1LmNhcmQgdG8gc3RhcnQgdGhlIHNlc3Npb24uXCIpXG4gICAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5leHBlY3RUZWFjaGVyKClcbiAgICAgICAgICBtYW5hZ2VyLnNldFBhbmVsKFwiaW5mb1wiLCBcImxlZnRcIilcbiAgICAgICAgICBtYW5hZ2VyLnNldFBhbmVsKFwiZWR1XCIsIFwicmlnaHRcIilcbiAgXG4gICAgICAgICAgXG4gICAgICAgICAgZGVsZXRlIGxvY2FsU3RvcmFnZS5zZXNzS2V5XG4gICAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5hY3RpdmVUZWFjaGVyU2Vzc2lvbiA9IGZhbHNlXG4gIFxuICBcbiAgICAgICAgfSwgaG91cnMgKiA2MCAqIDYwICogMTAwMClcblxuXG4gICAgICAgIHJlc0J1dHRvbigpXG4gICAgICB9KVxuICAgICAgXG4gICAgfSwgKCkgPT4ge1xuXG4gICAgICBsZXQgc3ViamVjdCA9IHRoaXMuc3ViamVjdEVsZW0udGV4dCgpXG5cbiAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSBtYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJZb3UgbWF5IHNpZ24gaW50byA8dGV4dC1oaWdodGxpZ2h0PlwiICsgc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFRvIHNpZ24gb3V0LCByZWdpc3RlciB5b3VyIGNhcmQgYWdhaW4uXCIpXG4gICAgICBlbHNlIG1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIllvdSBtYXkgc2lnbiBpbnRvIDx0ZXh0LWhpZ2h0bGlnaHQ+XCIgKyBzdWJqZWN0ICsgXCI8L3RleHQtaGlnaHRsaWdodD4gaGVyZS4gWW91ciBjYXJkIHdpbGwgYmUgc3luY2VkIHdoZW4gb25saW5lLlwiKVxuICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5zdWJqZWN0ID0gc3ViamVjdFxuICAgICAgbWFuYWdlci5wYW5lbEluZGV4LmVkdS5tYXhIb3VycyA9ICt0aGlzLmhvdXJzRWxlbS50ZXh0KClcbiAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5lZHUuZXhwZWN0U3R1ZGVudCgpXG4gICAgICBtYW5hZ2VyLnNldFBhbmVsKFwiaW5mb1wiLCBcImxlZnRcIilcbiAgICAgIG1hbmFnZXIuc2V0UGFuZWwoXCJlZHVcIiwgXCJyaWdodFwiKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hYm9ydEJ1dHRvbi5lbmFibGUoKVxuICAgICAgICBtYW5hZ2VyLnBhbmVsSW5kZXguc2V0VXBQYW5lbC5yZXNldElucHV0cygpXG4gICAgICB9KVxuXG5cbiAgICAgIFxuICAgIH0pXG5cbiAgICB0aGlzLmFwZCh0aGlzLmFib3J0QnV0dG9uLCB0aGlzLmNvbmZpcm1CdXR0b24pXG5cblxuICAgIHRoaXMudXBkYXRlQnV0dG9uc01heWJlKClcbiAgfVxuICBwcml2YXRlIHN1YmplY3RPSyA9IGZhbHNlXG4gIHN1YmplY3Qoczogc3RyaW5nKSB7XG4gICAgdGhpcy5zdWJqZWN0T0sgPSAhIXNcbiAgICB0aGlzLnN1YmplY3RFbGVtLnRleHQocyB8fCBcIm5vIHN1YmplY3RcIilcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnNNYXliZSgpXG4gIH1cbiAgcHJpdmF0ZSBjbGFzc3Jvb21PSyA9IGZhbHNlXG4gIGNsYXNzcm9vbShzOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNsYXNzcm9vbU9LID0gISFzXG4gICAgdGhpcy5jbGFzc1Jvb21FbGVtLnRleHQocyB8fCBcIm5vIGNsYXNzcm9vbVwiKVxuICAgIHRoaXMudXBkYXRlQnV0dG9uc01heWJlKClcbiAgfVxuICBwcml2YXRlIGhvdXJzT0sgPSBmYWxzZVxuICBob3VycyhzOiBzdHJpbmcpIHtcbiAgICB0aGlzLmhvdXJzT0sgPSAhIXNcbiAgICB0aGlzLmhvdXJzRWxlbS50ZXh0KHMgfHwgXCIwXCIpXG4gICAgdGhpcy51cGRhdGVCdXR0b25zTWF5YmUoKVxuICB9XG4gIHByaXZhdGUgdXBkYXRlQnV0dG9uc01heWJlKCkge1xuICAgIGlmICh0aGlzLnN1YmplY3RPSyAmJiB0aGlzLmNsYXNzcm9vbU9LICYmIHRoaXMuaG91cnNPSykgdGhpcy5jb25maXJtQnV0dG9uLmVuYWJsZSgpXG4gICAgZWxzZSB0aGlzLmNvbmZpcm1CdXR0b24uZGlzYWJsZSgpXG4gIH1cbiAgYXN5bmMgaGlnaHRsaWdodENvbmZpcm1CdXR0b24oKSB7XG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmZvY3VzKClcbiAgICBhd2FpdCB0aGlzLmNvbmZpcm1CdXR0b24uYW5pbSh7YmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuMDUpXCJ9LCAzMDApXG4gICAgYXdhaXQgdGhpcy5jb25maXJtQnV0dG9uLmFuaW0oe2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwKVwifSwgMzAwKVxuICB9XG4gIGNvbmZpcm0oKSB7XG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsaWNrKClcbiAgfVxuXG4gIHN0bCgpIHtcbiAgICByZXR1cm4gc3VwZXIuc3RsKCkgKyByZXF1aXJlKFwiLi9zZXRVcENvbmZpcm1hdGlvblBhbmVsLmNzc1wiKS50b1N0cmluZygpXG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9zZXRVcENvbmZpcm1hdGlvblBhbmVsLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLXNldHVwLWNvbmZpcm1hdGlvbi1wYW5lbCcsIFNldFVwQ29uZmlybWF0aW9uUGFuZWwpOyIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zZXRVcFBhbmVsLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCI8dGV4dC1jb25hdGluZXI+PHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGhlaWdodD1cXFwiMjRcXFwiIHZpZXdib3g9XFxcIjAgMCAyNCAyNFxcXCIgd2lkdGg9XFxcIjI0XFxcIiBpZD1cXFwiYmFja1xcXCI+PHBhdGggZD1cXFwiTTExLjY3IDMuODdMOS45IDIuMSAwIDEybDkuOSA5LjkgMS43Ny0xLjc3TDMuNTQgMTJ6XFxcIj48L3BhdGg+PC9zdmc+PHRleHQtaGVhZGluZz48L3RleHQtaGVhZGluZz48cXVlc3Rpb24tY29udGFpbmVyPjwvcXVlc3Rpb24tY29udGFpbmVyPjwvdGV4dC1jb25hdGluZXI+XCI7IiwiaW1wb3J0IFBhbmVsIGZyb20gXCIuLi9wYW5lbFwiXG5pbXBvcnQgU2V0VXBJbnB1dCBmcm9tIFwiLi4vLi4vc2V0VXBJbnB1dC9zZXRVcElucHV0XCJcbmltcG9ydCBFYXNpbmcgZnJvbSBcIndhYXBpLWVhc2luZ1wiO1xuaW1wb3J0IGRlbGF5IGZyb20gXCJkZWxheVwiO1xuaW1wb3J0IHsgRWxlbWVudExpc3QgfSBmcm9tIFwiZXh0ZW5kZWQtZG9tXCI7XG5pbXBvcnQgUGFuZWxNYW5hZ2VyIGZyb20gXCIuLi8uLi9wYW5lbE1hbmFnZXIvcGFuZWxNYW5hZ2VyXCI7XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldFVwUGFuZWwgZXh0ZW5kcyBQYW5lbCB7XG4gIHB1YmxpYyBwcmVmZXJlZFdpZHRoID0gNjIuNVxuICBwdWJsaWMgcHJldmVudEZvY3VzSW50ZXJmZXJlbmNlID0gdHJ1ZVxuXG4gIHByaXZhdGUgcXVlc3Rpb25Db250YWluZXIgPSB0aGlzLnEoXCJxdWVzdGlvbi1jb250YWluZXJcIilcbiAgcHJpdmF0ZSBoZWFkaW5nRWxlbSA9IHRoaXMucShcInRleHQtaGVhZGluZ1wiKVxuICBwcml2YXRlIGJhY2tFbGVtID0gdGhpcy5xKFwiI2JhY2tcIikuZmlyc3RcbiAgcHJpdmF0ZSBpbnB1dHM6IEVsZW1lbnRMaXN0PFNldFVwSW5wdXQ+XG4gIHByaXZhdGUgYWN0aXZlRWxlbWVudDogU2V0VXBJbnB1dFxuXG4gIFxuICBcbiAgY29uc3RydWN0b3IobWFuYWdlcjogUGFuZWxNYW5hZ2VyLCBhZGRyZXNzZXI6IHN0cmluZykge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuaGVhZGluZ0VsZW0udGV4dChcIkhlbGxvIFwiICsgYWRkcmVzc2VyKVxuICAgIFxuICAgIFxuICAgIGxldCBjdXJyZW50QW5pbWF0aW9uOiBTeW1ib2xcbiAgICBsZXQgc3VibWl0Q2IgPSBhc3luYyAoYmFjayA9IGZhbHNlLCBzdWJtaXQgPSBmYWxzZSkgPT4ge1xuICAgICAgbGV0IHNpYiA9IGJhY2sgPyB0aGlzLmFjdGl2ZUVsZW1lbnQucHJldmlvdXNTaWJsaW5nIGFzIEhUTUxFbGVtZW50IDogdGhpcy5hY3RpdmVFbGVtZW50Lm5leHRTaWJsaW5nIGFzIEhUTUxFbGVtZW50XG4gICAgICBcbiAgICAgIFxuICAgICAgXG4gICAgICBpZiAoc2liKSB7XG4gICAgICAgIGN1cnJlbnRBbmltYXRpb24gPSBTeW1ib2woXCJhbmltXCIpXG4gICAgICAgIGxldCBsb2NhbEFuaWFtdGlvbiA9IGN1cnJlbnRBbmltYXRpb25cbiAgICAgICAgXG4gICAgICAgIGxldCBjdXJyZW50bHlBY3RpdmUgPSB0aGlzLmFjdGl2ZUVsZW1lbnRcblxuXG4gICAgICAgIGlmIChzaWIgPT09IHRoaXMuaW5wdXRzLmZpcnN0KSB0aGlzLmhpZGVCYWNrQnV0dG9uKClcbiAgICAgICAgZWxzZSB0aGlzLnNob3dCYWNrQnV0dG9uKClcblxuXG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgY3VycmVudGx5QWN0aXZlLmFuaW0oe3RyYW5zbGF0ZVg6IC0xMCwgb3BhY2l0eTogMH0sIDUwMCkudGhlbigoKSA9PiBjdXJyZW50bHlBY3RpdmUuaGlkZSgpKVxuICAgICAgICAgIHNpYi5jc3Moe3RyYW5zbGF0ZVg6IDEwLCBvcGFjaXR5OiAwfSlcbiAgICAgICAgICBzaWIuc2hvdygpXG4gICAgICAgICAgc2liLmZvY3VzKClcblxuICAgICAgICAgIHNpYi5hbmltKHt0cmFuc2xhdGVYOiAuMX0sIDcwMClcbiAgICAgICAgICBcbiAgICAgICAgICBkZWxheSgyMDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRBbmltYXRpb24gPT09IGxvY2FsQW5pYW10aW9uKSB7XG4gICAgICAgICAgICAgIHNpYi5zaG93KClcbiAgICAgICAgICAgICAgc2liLmZvY3VzKClcbiAgICAgICAgICAgICAgc2liLmFuaW0oe29wYWNpdHk6IDF9LCA1MDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgXG4gICAgICAgICAgY3VycmVudGx5QWN0aXZlLmFuaW0oe3RyYW5zbGF0ZVg6IDEwLCBvcGFjaXR5OiAwfSwgNTAwKS50aGVuKCgpID0+IGN1cnJlbnRseUFjdGl2ZS5oaWRlKCkpXG4gICAgICAgICAgc2liLmNzcyh7dHJhbnNsYXRlWDogLTEwLCBvcGFjaXR5OiAwfSlcbiAgICAgICAgICBcbiAgICAgICAgICBzaWIuc2hvdygpXG4gICAgICAgICAgc2liLmZvY3VzKClcbiAgICAgICAgICBzaWIuYW5pbSh7dHJhbnNsYXRlWDogLjF9LCA3MDApXG5cbiAgICAgICAgICBcbiAgICAgICAgICBkZWxheSgyMDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRBbmltYXRpb24gPT09IGxvY2FsQW5pYW10aW9uKSB7XG4gICAgICAgICAgICAgIHNpYi5zaG93KClcbiAgICAgICAgICAgICAgc2liLmZvY3VzKClcbiAgICAgICAgICAgICAgc2liLmFuaW0oe29wYWNpdHk6IDF9LCA1MDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHNpYiBhcyBTZXRVcElucHV0XG4gICAgICAgIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hY3RpdmVFbGVtZW50LmFuaW0oe3RyYW5zbGF0ZVg6IC0yfSlcbiAgICAgICAgICBhd2FpdCB0aGlzLmFjdGl2ZUVsZW1lbnQuYW5pbSh7dHJhbnNsYXRlWDogLjF9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChzdWJtaXQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5zZXRVcENvbmZpcm1hdGlvblBhbmVsLmNvbmZpcm0oKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5zZXRVcENvbmZpcm1hdGlvblBhbmVsLmhpZ2h0bGlnaHRDb25maXJtQnV0dG9uKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJhY2tFbGVtLm9uKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgICAvLyBQcmV2ZW50IGJsdXIgb2YgU2V0VXBJbnB1dFxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZiAodGhpcy5iYWNrRWxlbS5jc3MoXCJvcGFjaXR5XCIpID09PSAwKSByZXR1cm5cbiAgICAgIHN1Ym1pdENiKHRydWUpXG4gICAgfSlcblxuICAgIHRoaXMuaW5wdXRzID0gbmV3IEVsZW1lbnRMaXN0KFxuICAgICAgbmV3IFNldFVwSW5wdXQoXCJQbGVhc2UgdGVsbCB1cyB3aGF0IDxoaWdobGlnaHQtdGV4dD5zdWJqZWN0PC9oaWdobGlnaHQtdGV4dD4geW91IGFyZSBjdXJyZW50bHkgdGVhY2hpbmcuXCIsIFwidXBwZXJjYXNlXCIsIChzKSA9PiB7XG4gICAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5zZXRVcENvbmZpcm1hdGlvblBhbmVsLnN1YmplY3QocyBhcyBzdHJpbmcpXG4gICAgICB9KSxcbiAgICAgIG5ldyBTZXRVcElucHV0KFwiUGxlYXNlIHRlbGwgdXMgd2hpY2ggPGhpZ2hsaWdodC10ZXh0PmNsYXNzcm9vbTwvaGlnaGxpZ2h0LXRleHQ+IHlvdSBhcmUgdGVhY2hpbmcgaW4uXCIsIFwidXBwZXJjYXNlXCIsIChzKSA9PiB7XG4gICAgICAgIG1hbmFnZXIucGFuZWxJbmRleC5zZXRVcENvbmZpcm1hdGlvblBhbmVsLmNsYXNzcm9vbShzIGFzIHN0cmluZylcbiAgICAgIH0pLFxuICAgICAgbmV3IFNldFVwSW5wdXQoXCJQbGVhc2UgdGVsbCB1cyBob3cgbWFueSA8aGlnaGxpZ2h0LXRleHQ+aG91cnM8L2hpZ2hsaWdodC10ZXh0PiB5b3UgYXJlIHRlYWNoaW5nIGZvci5cIiwgXCJudW1iZXJcIiwgKHMpID0+IHtcbiAgICAgICAgbWFuYWdlci5wYW5lbEluZGV4LnNldFVwQ29uZmlybWF0aW9uUGFuZWwuaG91cnMocyBhcyBzdHJpbmcpXG4gICAgICB9LCB1bmRlZmluZWQsIGkgPT4ge1xuICAgICAgICBpZiAoaSA8PSAwKSByZXR1cm4gXCJIb3VycyBjYW5ub3QgYmUgbmVnYXRpdmVcIlxuICAgICAgICBpZiAoaSA+PSA3KSByZXR1cm4gXCJUaGUgbWF4aW11bSBsZXNzb24gZHVyYXRpb24gaXMgNiBob3Vyc1wiXG4gICAgICB9KVxuICAgIClcblxuICAgIHRoaXMuaW5wdXRzLmVhKChlbCkgPT4ge1xuICAgICAgZWwuc3VibWl0Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHN1Ym1pdENiKGZhbHNlLCB0cnVlKVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHRoaXMuaW5wdXRzLm9uKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzdWJtaXRDYihlLnNoaWZ0S2V5KVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRoaXMuaW5wdXRzLmZpcnN0XG4gICAgdGhpcy5pbnB1dHMuZmlyc3Quc2hvdygpXG4gICAgdGhpcy5pbnB1dHMuZmlyc3QuZm9jdXMoKVxuXG5cbiAgICB0aGlzLnF1ZXN0aW9uQ29udGFpbmVyLmFwZCguLi50aGlzLmlucHV0cylcblxuICB9XG4gIHByaXZhdGUgY3VycmVudEJhY2tCdXR0b25BbmlhbXRpb246IFN5bWJvbFxuXG4gIHByaXZhdGUgYmFja0J1dHRvbklzU2hvd24gPSBmYWxzZVxuICBwcml2YXRlIGFzeW5jIHNob3dCYWNrQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmJhY2tCdXR0b25Jc1Nob3duKSByZXR1cm5cbiAgICBsZXQgbG9jYWxBbmltYXRpb24gPSBTeW1ib2woXCJhbmltXCIpXG4gICAgdGhpcy5jdXJyZW50QmFja0J1dHRvbkFuaWFtdGlvbiA9IGxvY2FsQW5pbWF0aW9uXG4gICAgdGhpcy5iYWNrQnV0dG9uSXNTaG93biA9IHRydWVcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmJhY2tFbGVtLmFuaW0oe3RyYW5zbGF0ZVg6IDF9LCB7ZHVyYXRpb246IDcwMH0pLFxuICAgICAgZGVsYXkoMjUwKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEJhY2tCdXR0b25BbmlhbXRpb24gPT09IGxvY2FsQW5pbWF0aW9uKSByZXR1cm4gdGhpcy5iYWNrRWxlbS5hbmltKHtvcGFjaXR5OiAxfSwge2R1cmF0aW9uOiA1MDB9KVxuICAgICAgfSksXG4gICAgICB0aGlzLmhlYWRpbmdFbGVtLmFuaW0oe3RyYW5zbGF0ZVg6IDF9LCB7ZHVyYXRpb246IDcwMH0pXG4gICAgXSlcbiAgICBcbiAgfVxuICBwcml2YXRlIGFzeW5jIGhpZGVCYWNrQnV0dG9uKCkge1xuICAgIGlmICghdGhpcy5iYWNrQnV0dG9uSXNTaG93bikgcmV0dXJuXG4gICAgbGV0IGxvY2FsQW5pbWF0aW9uID0gU3ltYm9sKFwiYW5pbVwiKVxuICAgIHRoaXMuY3VycmVudEJhY2tCdXR0b25BbmlhbXRpb24gPSBsb2NhbEFuaW1hdGlvblxuICAgIHRoaXMuYmFja0J1dHRvbklzU2hvd24gPSBmYWxzZVxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuYmFja0VsZW0uYW5pbSh7b3BhY2l0eTogMH0sIHtkdXJhdGlvbjogMzAwfSksXG4gICAgICB0aGlzLmJhY2tFbGVtLmFuaW0oe3RyYW5zbGF0ZVg6IC0xMH0sIHtkdXJhdGlvbjogNTAwfSksXG4gICAgICB0aGlzLmhlYWRpbmdFbGVtLmFuaW0oe3RyYW5zbGF0ZVg6IC0zMn0sIHtkdXJhdGlvbjogNzAwfSlcbiAgICBdKVxuICB9XG4gIHJlc2V0SW5wdXRzKCkge1xuICAgIHRoaXMuaW5wdXRzLmVhKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSBcIlwiXG4gICAgfSlcblxuICAgIHRoaXMuaW5wdXRzLmZpcnN0LnNob3coKVxuICAgIHRoaXMuaW5wdXRzLmZpcnN0LmNzcyh7b3BhY2l0eTogMSwgdHJhbnNsYXRlWDogLjF9KVxuICAgIFxuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbSA9IHRoaXMuaW5wdXRzW2ldO1xuICAgICAgZWxlbS5oaWRlKClcbiAgICAgIGVsZW0uY3NzKFwib3BhY2l0eVwiLCAwKVxuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRoaXMuaW5wdXRzLmZpcnN0XG5cbiAgICB0aGlzLmhpZGVCYWNrQnV0dG9uKClcbiAgfVxuICBhY3RpdmF0aW9uQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuYWN0aXZhdGlvbkNhbGxiYWNrKClcbiAgICBcbiAgICB0aGlzLmlucHV0cy5maXJzdC5mb2N1cygpXG4gIH1cblxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHN1cGVyLnN0bCgpICsgcmVxdWlyZShcIi4vc2V0VXBQYW5lbC5jc3NcIikudG9TdHJpbmcoKVxuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vc2V0VXBQYW5lbC5wdWdcIikuZGVmYXVsdFxuICB9XG59XG5cbi8vQHRzLWlnbm9yZVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYy1zZXR1cC1wYW5lbCcsIFNldFVwUGFuZWwpOyIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJSUFBQUNJQ0FZQUFBQXJtRE9iQUFBQUJITkNTVlFJQ0FnSWZBaGtpQUFBSUFCSlJFRlVlRjdzdlFkNEZWWFhOcnhtVG0vcEJkSUlCQkpLU0lEUVMrZ2RBa2dSUlJHa0tDam9nNEFncUlDQ2lJaU5xaWhTUk9tOWR3ZzlFQklDaEJRQ3BQZHllcG1aNzdySGMzZ2pEMGp3MWVmN3IrLzV0MWN1eWNrNWMyYnZ2ZllxOTdyWEdvYitTMFpNRElVTTdrWU5nd01vN0dveTJWZXNvNS9YZlVrL2g5V2poa1RFNXVSVDBjdVRxZS9icjFLdm1HWVVrbE5NRHc0ZG9ic1hFdW5CZjhNU01mOE5rOFFjUncyalQwWU5wdG1WbFNSeGNFUjdqMUw3cUNZMEw2Z1c5UklFb3Z4Q1NyaCtpMTUrZVRDbENqd0pLaVV4bS9mUVo3L3NvTG4vRFd2MFh5TUkyTXoxWDFPWjJVcWV0ZndZdW4xTGFFOHlpbXNaVGJPc1ZxSjdEK21YQThkbzl1ZHo2ZUdkZENLYm5leGozaVg1ZjRNUVlJNy9WWUx3dzFMS1VTa29FQnFnMGtDVGk0cW9VY3ZtTkVYZ2lUTHUwMzU5SmExcjBZeDJQTXdsMHB2SU5Ic2hhZjUvUWZoL2NBV1dma2dwL243VXhHQWtRYWtnb1VwUGpMc2JNVHhQWkxjVEJkUWk0WG95VVpjT3hHVGVwNHJYcDVIbi80UEw4TVFwL1ZkcGhFV3o2RktUQ0dxajFSRHB0QXhwTlNTd0RPRS9nakNZelVSR0UxR2xYcUFyaVhUems2OHA2amtFQWRyald5S3lFdEZNSWpJOHgyZi9yNy8xdjBvUXRxMmhKSk9GbXVibUVlbmNpSkZKaVV3bUlvbUVCSmhKblpaSWIveGRLTHc5Nk83b2Q4U0l3alVVemszRzcxSWk0cDAvcnIrM0lhSVVJaW9sb2dRaTZ2aC9mWGVmNHdiK3F3UWhNb0ttenA5Qlh5bVZ4SGk2TVl4Y1RxU1EvUzRJTmpzeFpnc1J4eEVaelVTekZ3cnpycWZRL0dwcmVaaEkvUDBpRVgxQVJERkVOUFFKYTcyUmlGNGhJaTBSR1o5akwvNnZ2dlgvTTRJZ0NJSjRMd3pENEhUKzNTUG9sVmRHWDc2VHZORzNmVXRCWXJHcWVMTk5MdWoxTE5rY1VsWXFFVGhHNEJtQkhCSzVYR0NrRW81dXBKaEs3bVlTTmxWSlJNMkpSRE5SbjRnS25LOWxFNUh2RTI0MGxZakNuZSt4UFcwaWdpQTBZQmdtL2UrZTZGKzkzajh1Q0FFQkFSM3o4dkpnTjYvK3lhTFVmLzMxMTAvUG1qVnJUa1JFeFBxL09wbW5mSTVoV1hiQjRNR0QzeTBwS2VVLytHQTI0K2Zuejl5N2Q0OUpURXgwWExseVdlNXdPSVM3ZDlPWTh2SXloVXdtSTRmRFFTYVRpU1VpQ3hHZElhSWRSSFNBaU1xSnFBRVJMU0VTSFVtWWcrckR6eWtvdTU2aUxjVDNDb0xBSmlVbFhZcU9qbDdJTU15ZVo4d1htdVVmOXpmK2NVRm8zcno1SWIxZTN6b2pJK00wRWEwa29yTkVaSzgrK2RUVTFCT05HalhxdG5EaHd0UjMzbmxudEZxdFR2aTdOSU5Db1ZocnRWcGZsY2xrTW8xR1l4NHpacXhwNk5BWFpJMGFOVllsSjkrMHBLYmVZY3ZMeTVrN2QrNUk4dkp5K2R6Y1hEWS9QMS9DY1R4ck5JcnJyeWNpMThrR3JnQ244QzRSRFNTaSs5WG00VTlFMTRrb2dJanFFVkhXa3pZWVFwQ1ltUGh4Nzk2OVA5eXdZY1Bkdm4zN05ucUtJTWpVYW5XdnVYUG5MdjNnZ3crYVBPYVAvTTFuNVQrREkzVFFhTFMvV1N5V0FLVlN3Um1OeGtLbm5kMU1STWRnUnlzcUtsYjQrL3RQdHRsczFLUkpFMXVYTGwzU2h3d1pjcTU5Ky9hL0twWEtlSVpoNEpqVmRMZ1A3RUZyWXR0U0JNTVNVMVFxRDBxNlcwOVpMNnlaa0p0djRzdkx5MVVNcEV3UXlPSGd5R2cwQ05BSWRydGRrTWxrRXJsY3p0bHNObEU0OHZQejRSU0toNWlJMHB3Q3dEbnZlNVh6YnppeFk0bm9ReUx5SnFKM2lXaTU4ek9QN2xrUUJMbkZZbW16YnQyNmVZc1dMZXFhazVQRHhNZkgzK2pZc1dQdmdJQ0FkbEtwdEIzUDh3MDRqdk9Gek1wa2NvK3dzREJ2clZaelplZk9uYjFxT3ZtLytyNS9YQ1A0Ky91M0RRb0tYbFd2WHIxS2YzKy9WaHpIQ3lhVGtkbTZkYXVNNS9reXE5VjZMU0FnNEV4Y1hOekhhOWFzVVdPRE1PUnlPVFZvME1BeGNPREFwSmt6WjM3bzVlVjFxQ2FUakltaVNTZTNNU3NCRXQxS0k4ck9KNG9JSXdxcXpRaXpsdlkxVyswZXFodEpTY3o4K2ZQcHhvMGsrNzU5ZXdXTHhVSUdnMEd3Mld4TVVWR1JETUpRcTFZdFI5dTI3Ymc2ZFVKWUh4OGZ4bTUzOEhmdTNEYmN2My9mWEZaV1p1UjUzcENkblMyMzIrMjFOUnFOVjBWRmhZT0l4aE1SQlB5UkNTZ3FLaHEwWjgrZVVTZFBubXg5OCtiTjJxbXBxVktPNDZoRml4WWtsVXJMcmwrL0RyblU4VHpQNEhzOVBUMXRGb3VGdFZxdHVLOUxITWZCSWExOHd0eWhtZjQyWi9TZkVJUVJSTFROZFNJVUNrV1lyNit2Smljbko1T0locm01dWZWd09CeHhVcWxVM3JCaEk2dmRicmVucGQxMUR3NE9sbmJ2M3AxWnYzNDlOdVVQODI3WHJwMWw4K2JOMCtyV3JlczZoVStWaWJFdjBzbzFTOWhKZHJ0QWhjVkVOMU1GT25PUmFQRWNsa3JLQk5weXVKMVFib29WV3NTMHBYbno1dGx2M0xpQnNGQ1FTQ1M4V3EzbXZieThiSFhxMU9HeXM3T2hOU1FPaDBNZUdocHFDUTJ0eTN0NGVNaUxpNHVGcEtRYmtxS2lJbXdXTDVQSkdKUEpKTEhaYkpCZ1JCUHdIK0FIK0N4ZHVuVEhtalZyT21abVpySXVBV2RabGdZTUdFQVNpWVIyN1lJcjhidk1xRlFxSzRUUDNkMzlYRVpHeGoyRHdiQ2FpSXFkNFNqdXNaYlRZUTBqb2d5blZvVjIvVnZHUHlFSXpkemMzSWI1K1Bqa3F0WHFBcmxjYnI1Ky9YcU9FODdHaEdCelpSQUtobUZlSHpod1lCRFA4M1RpeEFueGxLNWF0WXF5c3Y3ZHZMWnQyOVp5OXV6WnJuSzUvSkp6NXVFU29paU82SVRUaVJOZkhqV1V2bG0zakowS1FXQllJZ2tRbzJxenhJWjg4ZE53czg2N2crUGN1WGpwOXUzYlZES1p6TjZ6Wjg4S3U5MU9WcXRWQnRPUW1KaW90RnF0cmx3RGZKcDRJa3FVeStXMUpSSkpTN1BaaklnQld1QTJFVzBpb29WRU5KS0lUZ3FDSVAzcXE2K3V2Zi8rKzFHNFp2V2gxV3BwMnJScDlPbW5uMUpRVUJDMWJObVNqaHc1UWthanNVZ2lrWnowOVBTOFpqYWJHL0U4NzJ1MzJ4bUh3NkdHZ2lTaUswN0hGYjVXMWQreSs5VXU4azhJQWk2UGplNGdsOHRiWStFTUJnTUVBQTRYUEhIWVZDeWlYS0ZRM1AvaWl5K2EvL3JycnkwWExGakFaR1JrME15Wk0wbXZoNno4Ky9qc3M4K3laOCtlSFVKRWpmL2x6bDY1YmVNTng4eDBsQ2NhN1hxM3R6djFPTENaanM1ZFRFZmNkSlFiR1VHTm1qU2t4bjI2TUI0cTVlL1R2WmpBOEV0WE0yUVdPdHZQbkRrTEV5V0Vob2JhOEtQWDY1bXFxaW8yTlRVVnF2Zng5VUgwczVXSXZpS2loMDZuRjV1QzA5cWVpSGJpK3JtNXVkK0doNGUvYlRRYW43aStyNzMyR2dVR0JncU5HemZtT1k1ajFxMWJaN3QwNlZLNlNxVzY3WEE0anVyMStzdEVWT0VFc1BDZGNFU2hCZjZ4OFU4Smd1dUdzZkU2VENRb0tDaEFKcE1GbTgxbVA2MVdxN0RaYkc2bHBhVmRqRVpqNDU0OWUycG56WnJGREJvMDZOL01RdldaRHg4K3ZHemJ0bTF3eUJJWGViTE5QaWpuRWNyQjVGVEhIcGdPTGVucStRU2FUa1E0UFJqK1UxNm5rek1tTVkzOGZRRlZNRlJVSXREVkpFWll1VEhZZGplVForMTJqbmM0N09Udjc0OXJDYmR1M1pLekxNdHdISWM1UEQ3TVJQUURFWDFPUkhtUC8zSDE2dFhaYjc3NVp0RFRkZzIrNnJCaHc0VG16WnZ6Zm41K2NLQWRITWZaVFNZeldTd1dvOTF1eXpPYnpUZXpzN092SnlZbXB0eS9meDlDVVBSNHRQVjNTc1hmTFFnNFJVRjE2dFNKVktsVTdSaUc2ZUJ3T09vS0FybVp6U1pKVlpXZU5adE5vcjJFalJRRUFkNDZNMmJNR0NZd01KRDU2YWVmS0Q4Ly82bnpRd2hhdjM3OXJoSWkvVW9mVnZ0MkNkL1NUblROajJpb21haEkvN3Y2aEZlUEV3b0hxN3BxMFhwNTBMeWVzZFJ0MXR0TWxKY0hzVzQ2RXRHck5adDh1Y1BuNmp2dXBHWkk2dFNwdzFkV1ZqSXFsUXBSQkplU2txS0E4L2FVbXdLY2pMd0NzQTk4cnpoKytlV1hyRkdqUm9VKzRUT2lrT0gxOTk5L24vSHc4R0RtekprandHK0FlY1NQVXFrVWZIeDhoRWFOR2dsdDI3WWxQejgvdnJpNDJKYWJtM2V2dkx6c1dGWlcxb25FeE1Sa0oxN3g2RHYvdDBMeHZ4VUUwWWtKRFExdEpwZkxoM2g1ZWZYMDl2YjJLaXdzaEpxWDJPMTJGZzVZV1ZrWmk1TWxrVWlFSmsyYU9OUnF0U1VwS1VsdU5wc1ZDb1dDNHVMaWFPVElrZlRSUngvUnJWdTNuanFuUFh2MnBBNGFOQWh4OThLTGdkTFpxNnM0MDJtejhOVjBEM1lPbG5lamdiOHZFYWpzb2syRWVObmFSQkU2S1RWVnM5UlV4Vkp0bVVCcWdVZ280YWlPa2FVcXVTODV4cjlHQVdOSE11b3psejJGaFBUWDdldldyWmRHUjBjN1NrdExtUWNQSGtoYXRteHBPM255cE5MaGNHQ3RFTWE2aEFML2RxM2ZQaUo2aVloTXVIbWowZmk5aDRmSGhNZjlBNWNRU0tWUzVyUFBQcU9ZbUJqTTE0b0QwcUpGQytIRWlSUENsaTIvTWExYXRlS0RnMFBZdTNkVDJjek1US2E0dUpoUktKUjhtemF0cVZPbldONXV0emxTVTFOdjYvWDZyWGw1ZVNjdlg3NE1QQU9DRDhIQVBjR25BQmhXNDFGalFmRDM5NS9yNys5LzBXZ0VFay8xWlRKWkYwOVB6MDdlM3Q2QmhZVkY3SjA3dDZVR2cwRUN0ZGVxVlN1dVQ1OCtsc0RBSU83aXhZdUtuMzllcDhUcjc3NzdydjNPblR2Mnc0Y1B3d0VTdnh1TE1XSENCRHB6NWd5ZFBYc1c5dldwTng4ZEhXMUlTa3FDcWFIMkNycjdqWSswZ2R6cEMwcVozNDhhZHVlYkNvNXZvMlRZUmpLV05DeVJTU0NoeENId2xRSTVCSUVFSlVOeWR3bFJGVS9zVGdOdnYrMGpTSGIrU3V6bHBIcjhubE90TERkdUpNbzVqcWYrL2Z2YlZxeFlybXpYcnAwOVBqNGVpNHRjQTRRTWF2OENFUjBsb244NWJYZ2lFYldHQTVtZm43OG5JQ0FnemhVcFBEWWhYaXFWc2pqdE9BQUlJM3YwNkNIVXFWUEhzWEhqSmpZNU9kbnlyMys5cXh3NWNxU3RjZU1ta243OStrazlQRHlFZS9mdThRaDFqeDA3eG1ablo3UEFWaUF3UFh2MkZIaWV0MlZsWlQzUTYvVUY1ODZkVXo5OCtCRGVOdTZ6eHFQR2dpQ1JTSmFQSFBuU21JU0VxL0w4L0h4V0xwY0w3ZHUzTiszZHU5Zk45VzE0YmQyNm4rMDllblJuKy9idFo4dk9mZ2hnUnVwd09CQWFPaUlqSSttYmI3NXhnVFRpeDBhTkdvVndTcGcyYlJvQUhQRzF1blhyY2dxRlFrRE1YWDBtL3Y3KzlzTENRcGNuTC9ObGFOY0gzbXkzbG5KR3FjTFNZQmNFRXFwNFFianZFR3pIVEh4VnZJVnU1bkVFR1Blc1hFcURmWHpJMHFBdXpTMHJJMU40UGZKenR4RUZwQkdsSzRsVzdXRm93YW9YemN0WGJWZnMzTG5USGhjWHAwQklwOVBwQkRpUWhZV0Z5RDJNZzZ3UlVSa1JmZXowZ1k0UVVUdG4yRHppOE9IREdYMzY5RUdZOTZRQldSV3puU3RYcnFTSWlBaW1lL2Z1WEs5ZXZjekhqaDNUckZxMW1uTjNkK1BuejE4QTFCTUxFaG9lSGk2ZE1HRWkzNmxUSjN5V1U2bFVFb1BCd0dSbloxTnVibzZRbDVjdk1ScU5ndGxzZGx5NGNENC9QVDBkQU5TOUdrdkJYMkFvZ2IvM2dVYWprU0lNS2lvcWtycVNSVkQ3dTNidE1vV0hSN0J2dkRGUmV1Yk1HV3dpOWdZMnp6SjkrblJ1MXF4WkFFQk9PVjhQWVJnbThNcVZLeUhIang5M1NDUVM2WWNmZmloWXJWWm14b3daUlY1ZVhqZG16NTc5QjBTdFU2ZE8rblBuemowU1BPZEU4WHRYSW1yaGpGYXdBRGVWU3NyWGFxbThwSVRNV2kxNXhqU2xnM0U5cWZuYnI3TVNTSXpydENMbGpKOUZYd29VR0VMVUxOS0wzM3Qrb3YyWFh6YXpCUVg1Yk0rZXZTd0hEeDVRanh3NTB2cmJiNy9CRkw1TVJMODl0c2g0SGNoaklCRzVXNjNXbWI2K3ZoOVdWVlU5OWFEMTd0MmI0QndmT25SSU9ITGtTSUhOWmtNWW1rUkVEL3o4L0hLa1V1blp2THk4RW1lRXRjQVptbXBoVnZ6OC9BUzFHdGliSUpTVWxBaVZsWldJMG9BcGZFUkVQenZEMnVlUmcrZW1xZ1VUVVU4aWVvZUlZS3R4QTdCRkNXM2F0QXU3YytlV2QxVlZGVjdEQWlDQXhxWWpXN2VVaUlZVFVYOGlpbUJaVnNuenZLUng0OFlDUUtSaHc0YkJlYUpMbDM2SENMeTl2U2s5UGYxVVJFUkUxK0ppWUNwRXRXdlhGdExTMGhicWREcEF1YzhhUzlvMG85R1R4NUQvZ3p5eXRJaGtGQW81TVJ3dlVOZjJER1hua1FndW5iMUkrbFViNk5Cckk2am43Q21NSjNSS1FaRWdKQlhzc3cwWk1saisrdXV2MjdaczJjSUNNS3BkdXpZSHA3R29DTTY3T0pkSGFKRHpaaERXZ3ZFTUJMUmZXbHJhempadDJnd3BMeStua0pBUUtpc3IrME5FQktkdzI3WnRKSlBKaFBYcjF3TnBKVUVnVHFsVTJJRnIyTzMyZXlhVGFidFQ2QkFaWWNBc05uYWFJbWdIQ0FwK1BJaW9yek9QZ3lUWmM0OGFtNGJIcm96UDRjVERjUklkRklsRThodkhjZGlrZWhLSnBKWmFyVzVvTUJnR3NDd2I1QXpCWUxkQTNBQ08wTmJUMDlQdDdObXo3TFZyMTRTMzNub0xpeTNpLzY2eFo4K2VKVzNhdE5sbE5wdDdXYTFXcmJlMzl4WmZYOTlyTlp5aDZORHBkT1NwVmxBdlZrTCs5WUxwMC9Rc0drMFNNbHF0VkN5VmtyUzBWRXdhWVdmZFo3eEp5UXRuc3lHRnhRSjl1ZWtkNjlkZmZ5My83cnZscGlsVDNsYXpMQXM3akpQSVFRczZUOXdLSW5yUE9mKzFSRFRKaVpWZ0VpcEJFR3dQSHo0YzczQTRndHpkM2IvZnQyL2YwckZqeHdKd0VzMEMvcTlXcTZsNTgrWTBZc1FJWkRzNWFNWXJWNjVVNmZYNm16aGdNcGtzM00zTnJaYUhoNmZOWnJNV2xwV1ZIVGNhallDd2IxUWp5ZFJ3U2Y3OGJYOVZFQjYvcXArbnArZGdudWRIV3EzV0pqYWJ6Y0h6UE93bXdCZlkwcGQwT3QyZ1RwMDZlWVdFaE1qdjM3OHZnVGZjcEVrVFdkZXVYY25UMDVNbVQ1NzhoeE56OU9qUkJiMTY5WUlOL3JzR1FsdEYwNlpOWjJablowZFdWRlRzZDJJQllnaFdMNFFHYlAyZTJidDBqWnJmYzVnbnM5a3NtVDM3QStObm55M1MrUHI2V29xTGk1Vnl1WHlmeldhRElPRDBZVU9SbGdZdkFhOUZFdEVXSWdMRS9tK2tsSVVMRng2Y00yY09QdmRvdlBYV1c5U21UUnRDN21IQmdnVUlwZmttVFNMNWJ0MjY4anFkbSszSWtTT2xKMCtlT0tYWDY3Y29GQW9JZHcrVlN0VlZwVkxWbGtwbFJvTkJuMUplWGc0UUMwNHJOTzlmSG84TEFuNVhFUkVpZzZjUlJCQVMxcEpLcFYxc050c2d1OTNld25tU3IvTThEMVdHV0I1aDFHc013NHlSU0NRaGJkcTBrWWFGaGJHLy92b3JralM0V1FhbW9GYXRXdUpDUUJpczRKUTdSM2g0T0NVbkovZFJLcFVRcHVjZHVIL0prM0w0bzBlUHVYSHc0UDRtNWVYbFJ6aU9BendNamdHQUlReWZUeitkbnkyUnlCMjdkKytteTVjdmE2ZE9uV3I0OXR0dk5iR3huYzFuejU1QnBQTVRZQUpBRDg3UFlkUGgwTDNsUkJxaHVpRWNJTFBnK285R2RuYjJxTmpZMkUzVjRYUGdCOE9IRDZjUFAveFFESnNuVHB3b0tKVkt1elB4Ulo2ZVhueDRlQU8rZmZzT1ZyMitxblRIamgyWEN3b0trTXFIUnFndmtVZ21NZ3d6ZVByMDZiTGp4NDlYVkZSVUZOcnQ5aHlPNDNKTFNrb3FMUllMRmhWN2ludDNkNEp2RzV6NWl6K3M2K09DQUttclRVUmV6aENwazFhcjliSmFyV3FOUmdNcDkrUTRUbTIzMi9VT2h5UFI0WEJnMHdHSHdrNWg4NXV5TER0RExwZDNxMTI3dHUrNGNlTUZBRVhJSXh3N2RsUlNXRmdvcW15QVNjdVdMYU84dkR3eDhaS2VudjdJZWNQZnYvLysrd01USmt5SWM2V2ZCVUVBNGFPVVlaaW5BU2plRXlaTWVLOTkrL2E5YlRaN3JTVkxQbWNmUG55STNBRzRENHVjdGp1bWQrL2VaNDRjT2FMdTNidjN4MGVPSEVGU0IzTUZPSVBSYk9yVXFXZFhyVnFsYWRXcWxlbkNoUXZhc1dOZnQvMzg4enJaZ0FFRHpQdjI3Y05pd2hFRlJRMy9CcUlJZ1lPdGhrYUFoTU81aGErd1ZoQ0UybnE5dnExT3AwdGlHT1llRWxoSGpoejVzaytmUHZDdkhnMWZYMStDNDlpcVZTdGF1blFwbFplWGM3MTc5emFhVEdiRjhlUEhKRGhrR28zR29WS3BwRUZCUVVKRVJFT2JYbCtWYytEQWdhTWN4NEVzcTVWSUpBMDVqZ043NnJwU3FiU3dMT3RtdFZyZE9ZNXo4U3loTGVETXdvZDVZa3IvV2FZQnB3dWVNUDZQaVNJdENPQUMzci9yZ3RqY25oS0paSWFmbjEvclhyMTZTWnMyalFJUXdwNDllNFpOUzB0amdSNnlMTXZ6UE0vcWREcWFOR2tTOWVyVmk5TFMwa1NUVUgzQVRCUVVGQXlUeStYWEdJYTVuNUNRTUhqbXpKa2IrL1hyZC9POTk5N3J4akRNSTZERXc4TWp1bDI3ZHBIVHA4OVkyS2hSbzhENzkrOExpTFdYTGwwcUJaamx2Qzd1R2Fmb2wzSGp4c2R2MmZLYnBrT0hqbGxIamh3R01kVjFhaVdSa1pHLzNydDNiNGhXcStYcjE2L3Z1SERoZ25ya3lKZUViZHUyVXAwNmRhejM3dDNEb21MMFFHTHBNVFVGd1hqQm1RemFLd2hDMCtIRGg1KzZkT21TVjNCd3NPWDk5OS8vYXZEZ3dYT0tpNHRmOHZmMzN3d0VzZm9ZTTJZTVRCRlFSVUsrSlNrcHlUSjY5R2l1VzdkdWtrOC9YY2pmdlpzcWgwQUVCQVJVbVV4bWxWUXFrWWFFaEFpK3ZyN21peGN2SGlzcUtwcEdSRWpzL1dXYTM3TUU0Yy9VTWhhNm03dTcrd2RCUVVHdDY5Y1BsOGhrRXNtZE8zZll1M2Z2SW12R0toUUtEcWMvTUREUUJvZnIvdjM3YWdCSXJWdTNwdVBIajhOanBzUkU0REIvSEtOR2pTbzNHQXpLM2J0Mzk5MnlaVXYva1NOSHprQzR0R0hEaGl2RGhnMXI2M3AzeTVhdDduejAwVWQxZkh4OFpBY09IQ2pMeXNxNjZYRFlaU2RPbkd4WFdscUM2TVUxc0VCWGV2VG8yY1RMeTVQZHUzZWZ3bUl4UnpoVkplaHBDNk9qbzk5TVNFaFFEeHdZWjBTeTZPVEpFNXBYWG5tVisrMjNYeGxJc0VRaWdVQmp6a2cySWNuMVZPOTgrZkxsNlZPbVRLbnZjbjZYTEZseWJNYU1HUU8rL1BMTE85T25Ud2Q3NlE4RFRpTTBBbkNVdm4zNzB1Yk5td1dOUm10ZHNHQSt4Y1MwbENGNlNVdTdLd0Z2b212WGJwWEJ3VUhzMmJOblZaV1ZsVkpvRkpWS1ZYTHIxcTBQOVhvOTFQNGZUTktmYldEMXYvMVZRV2pFTU14bm9hR2gzZjM4L0NWRlJZVXlPSURBRkZRcUZROTdQM1RvTVBPNWMvSHlKazBhY1lXRmhWeGFXcHI2dmZmZVk4NmZQdy9BU0lDd3VNTEZKOTBzUXJrWk0yYmNqNCtQcjMzaHdnWHhOSTRlUGJwOC9mcjEzazRhbS84bm4zeWE2dTd1cmxtMGFPR2Fnb0lDcElHaEFxV2VucDU3UER3OGVtVmxaZjBCa01JMXVuZnZibE9yMWZiTGx5K1hXSzNXNjJxMXVyNnZyMjk0V1ZrWkZwcHAwNmFOOGNxVksrcmk0bUxwcEVtVExHdlhyb1ZmQTNqOEhzZHhyazJFN3dJTklFTEsxWWNnQ0xxZ29LQ3kzTnpjUjkvZG9VTUgyOHlaTTc5ZnRtelpXMmZPbkhucW1rK2RPcFZTVTFQRlJCVFFRNVBKWlAvMjIrOWt1Ym01MWpmZW1DaEI1RkpWcFpjMmFGRGZPSDc4QkM0akkxMTY4dVJKYVZWVkZmN0dGUmNYSHhjRUFkcmh1VW14enlzSTJKQUpJSU82dTdzalJKSlVWRlE4T25rZUhoNzh3SUVEclVqVzNMaVJwSFJ6MDRtbi90aXhZNUo2OWVvSml4Y3Y1dmZ0MndlbkVScmplYjhia2kvczJMRmphOSsrZlY5aUdPYUhXYk5tRFYrNmRPa0poOE9CdUw2Ni8rQVhGeGUzTFQ4L3Y5MzE2OWZCQ1ByRGQwSDloNFRVNFhpZWcwMEdsaTlScTlYY2l5K081Rk5TYm5LWEwxK0dLUVJ2d0xwOCtYSTVtRXRFTk5IcEpMcXVoZXdtRU1aSEp4QUg0ZWJObXorMWJ0MTZERTV2OWVGS0xQM0pDWVhXNGpRYWpXVGh3b1ZVV1ZscC8venp6dyswYk5tS0ZpeVlQK0RkZC8vbGtNdGxDQy9GOUxoY0x1ZEhqaHpwYU5teWxmM0xMNWZLM2R6Y29IR2xlcjBlcGhzRUdUaTJmeVJEL01tWFA4OW1OSk5JSkY5NWVucTJ3NlIwT2gwUHV3a3lKbXhUOCtiTnVmNzkrM01YTGx3UWJkdmN1WFB0cTFldnJwZzJiWnF2eVdRaWxtVU40OGVQRnp3OVBiM05aak1ETXNiZHUrQ0FQdDhBRUpPVmxiVzhmZnYyUFFvTEM4Tk5KbE1YSjJuazhRdnBRa05EMTlldFc3ZHZadVk5cHFBZ1h5U2NQUDRtbUt5R0RSdmFJeU9iOHFHaGRZUVZLMWJJalVZam5FQm9KTzdiYjc4RkV3a0w2bklRNGJoQzZBQmJueWVpWmE1ckZoWVdEbzJJaU5oZVVRRXF3Zk9QaVJNbmNzaEQ5TzNiVnhnK2ZEaVBCRjFGUmNYUkJnMGFTQXdHWTZlTEZ5OW9QVHc4cktXbHBhS2dZa3lmUHQwV0ZCUnMrdmpqajdTQmdZR3dZdkF6QU91RHNBUCtKQkRMWjQ2YUNBSWtjSnBTcVh6Znk4c0xGQzM1aUJFdkduZnQycWt4bTgyaUVJU0VoRGdDQWdJRWpVWmo3OU9ucjJ6ZXZJL3RScU1SY0djNHk3TERlSjVQOS9Ed01EWnUzTGcxSkhybHlwVXNJb2FmZi82Wjd0K3ZUZ1IrNXYyS2IzajMzWGVGUFh2MjNMaC8vMzR6UVJEQUprWVlDS2YyRFNmK0wybmZ2djIzUTRhOE1KWmhTUExCQng4d1NCeUJuUXhBQ0dSVmFDcFBUMC9PMTllUHQ5bXM5UG5uUzJqUW9EaUoyV3grcE9IZWUyKzZmY1dLNVZLTHhRSXdETG1ENzZFUm5lSDFKMDRpeWlOcFBuMzZkSEdYTGwxOGFqYUxQNzRMdmhNUTFuMzc5bGtyS2lwQWpCRTMxZC9mSDV6SjNJeU1qTytzVml2TURZQXJoSUt1dWt4aDdkcTF0cFNVRk92NjlldlZScU9SallxS3N1WGs1RWdMQ3d1dGdpQkFPeURjL1ovNC9BazMrR2VDZ0w4MWw4bGt2M3A2ZW9ZZ3MyZ3ltYVF0VzdZMGN4d25UVXhNRkpNL1dxMldrOHNWUWxsWnFVbWowV3d6R28ybFVxbTBFcmFLNDdoMGlVUnlyVkdqUnFNUWR0NjVjMGVFbjVGOGF0KytQWFhvMElFKy8veHp1bjI3UmtJcjNqNmN6L2ZlZTg5ODZOQ2g3amR2M2dTdWpsd0Q4SCt3ZU9Bc0lmUnRPbUxFaU9OYnQyNkZKN3FYWVpqRmRldld0ZHkvZjEvUm9FRUREajVNWldVbEVtS3N1N3U3ZmZic0Q1aXFxa3BtMGFKRldHZ1g4a2VUSmswMnIxLy9zOUprTXVFNkNCdUJFeUFmVUplSTFqbUZBdG9CR29RN2VmSmtmcmR1M2NDRnFQR1FTcVgwOHNzdmkvUzhJVU9HMkQvKytHTWtsQkFoMkNvcUtwQk1FaDN1aGcwYk91QUhsWmFXL3VpY0sxQldjUS9jM055NER6Lzh5SkdRY05WNjhPQkJ0VjZ2Unk2SWE5aXdJYktTc3JLeThsdUN3QVByd0dlZW1KNnVMZ2hlV3EwV1pFMlZ4V0pwQ3EwamxVcmJ3MXUyV3EyWUtCTWRIVzJPaW9vV05tN2NBRFdKQmROSFJrYmFVMUpTZ05MTlVhbFVyRlFxWFcwMEdsdnlQRDlmcDlQMWE5MjZkZmZ6NTgrRHl2MEh0YXpSYUpDSkZNR1VQeU9qdUZZVUtyeHIxNjc2NmRPblgralRwODliaU0yQkZCSVJ2aHVWU0FEQllCZUJSaUtuc2RlcHpuRnlBTXVpRmhIdmdWb1ZHSWFSd2FhM2JOblNzR25UTDhxWFhocEpOMjdja0hoNmVqckt5c3BFclRCNDhHRHJpUk1uNUhxOUhxZmVWWCtBZUIzOEErQUZ1QzVZU2loMCtVV3YxemVlTzNmdW9TMWJ0Z1FWRkJROGpjenlCeUdCbVVVVWhjMi9kZXVXMEtsVEoydEpTWWtrTFMxTnJLOTBjM096bFplWDQyU25lbnQ3UnpJTWsxQlNVZ0ptTXh6WDc1elZWOTVoWVdIbUhqMTZTQzlkdW1UTnk4dVRsNVNVSU9Sa2xFb2wzNkpGakRVM04wZGFYRnhjNUhBNDF0dHNOa0RZQ0t1eGR1SjRKQWhhcmZiYjBORFFjUWFEZ1FXL0g4d1lxVlRLbnpzWHIrQjVqcWxkdXpiLy92dXo3Tk9udjZlQWFuVldMaUhuUFFXY2ZwMU9ONHZqdUgrWlRDYVFQTi8yOC9NN0dCRVJFWER1M0Rsc2xndGJkMWdzRmhuUXRDWk5tb0JGTExKeWFqS0dEUnRXdm0zYnRub013OVRFQUdQekFSUWhId0FiRHI0a1ZEdklEclcxV3UwaW5jN3RoZno4UEZsVVZKVGoyMisvQXcrQ2YrKzlhWXlQancrZmtwSUNaSkFQRHc5UEx5b3FDcStvcU1COEFhaEJrRVJ6Nk5RT0FLUmdoMkdQZ2FxS1k5KytmVGVHREJrU2pZcXBtbzcrL2Z1TDNJd1ZLMWFBczhuSHhjWFp6cHc1SXlzdUxrYUNIWWxHWE93YmhtRkcrdm41cVFvTEM3c2p5K3E4SHdnOUVNL1ZFb2xFZzMwRExiNmdvRUNjaHhQd0VoQ05lSGg0Y0tqeUFwT2NpQjRiaytMRUFBQWdBRWxFUVZRaHQ5VTFBZ2lsaUkyeFlLN0pjZ3pET01hTUdTTXJLU2xoOXUvZmo3UXpjZ2Z3bUVIUGtzcmw4aGNWQ3NVS2tENXhpSkFPYmRDZ3dYbUdZVFJwYVdrNFdhS3FEUThQdDkrN2R3L1JBd3NtRW1qcng0Nmh2cVZtWSt2V3JTa2pSb3lBcHFycGdOcnM1SnhUOVIzcDNMbHo1NE5uenB4UjYzUTZlNDhlUGV4WldWbTh6V1pUd3NuTHk4dHpoWDBJRFpkNmVIak1nWXAyVXNteDhQQkpBQ3VqNHZtSlF4Q0V3SkNRa0J6d0JaNW5mUEhGRjREYXVibHo1OEprMllLRGc5bUFnQUQrMkxGajR1bDJyaVZNZzFTcFZMNW9zVmkrZG1wQXpCVWdIK2h4U0lBQmEzR1pPWkJwWU1waW5XWVU2T0xVeCsvL1NUNENoQUNxSDR0bldiWnNXZG9ISDh3SnNWak1VSU9BTklGelk5VFZhRFFIalVZakNqNGhqUUJaZXJkcDAzWkhlbnFhRW5FNTNxVFZhbTBHZzBIZXNtVkxhMEpDZ29nSGdNc0FQTDlIRDRCME5SdGhZV0hjOWV2WDU3dTV1WDFSSFYyczJhZi81MTFObWpTNWUvLysvZnJJZHZibzBjTmt0OXNsTjIrbThLV2xKZXFHRFJ1QkRJSlRoQUhONHpWa3lKQ2NYYnQyNGVRalFrQUt2aVVSOVNGNmVtOGxvOUg0blkrUHo5dEFDMnM2a0Y5cDBLQUJIVGh3UUVCb09IQmdYTldPSGRzOThlOVJvMFpaTjI3Y0NFM3NNamNRUWhCa1FNNkZ3SFp3d3NlUGZ4MDBJN1FGRHNTZmptZEdEVHFkN2tlOVhnKzdDd2dUZzNGemM1dGpzVmhuMjJ4V3FGd3NDdklOazNyMTZ2VkZmSHc4bkN2Y01DT1R5WGprOFI4K2ZDanIwS0dqOWZ6NWVBVVF0TXJLU3ZHbnNQRDU2ak9RdSsvY3ViUGwyTEZqa0hDa2owR05xN24rSllyV2FyV1hMUmFMZFAvKy9keXdZY09ZNGNOSGNPdlcvU1NhcjZaTm01cHYzcnpwQ3MxUTFRemc3SklnQ0JCMjVQenhYZEJ3a09Cemo2K3NJQWlLa3BLU3I2T2pveWZtNWVYVnlFZHdYY1BmMzUrKy92cHJMaWtwaWZuODg4K1ozMzdiVWo1ejVneFZibTZ1SE15dnFLaG9QaWNubTBVMDRMd0g1RHFpaVFnWS9Xd2lRdkVQL3Y5NEJiWXJiZjYvRTRUSFB1MmwwK24yR0F5R2RvSWd3QzRpdjQ1czI4YzllL2FjZWZyMGFSV3lpNUJpbTgwbTZkS2xxL24wNlZOS3FWUUtiSUdPSGowcUJUOFJ5YVNUSjAreXNLRi9JWHdVd3NMQzdENCtQamJrTUlCbmRPclVxV0xFaUJHSG16WnQrZ25ETUgrbWowR1U2UXgwY2N5WU1aTGx5NWN6WldWbGZIcDZ1dWdjaG9hR21nQ0RPK2NNTTRCU2VPUWtBQ3Nqb1FRLzRYUmVYbDZaaDRkSHY2U2twSmV2WHIzYUpDVWx4UU1iQmlmdHpwMDdjTGFmZWNDcXI2dEtwUUxPQWw2Q3RVV0xGdEs1YytjeUowK2U0b1lQSDg2bzFXcHpYbDZ1T2l5c3ZpTTNOd2NzYTVFSDZ2dzhXTlJnWmlFMGhMYUdRd3kxaitydDV4bzF2dUhvNk9pT1dWbFpQMVpWVmVFMHpuSjZyQTZXWlQrUGpZMmRmUDc4ZVdRbG1ZaUlDRXRHUm9ZQ2FGN2p4bzF0dDIvZlJuMEE5L0xMTC9PYk5tMlMxYXRYang4M2JwekFjWnpraFJkZW9BMGJOb2pwYUZRNElRdjVWd2NTTm8wYk56YlBuei8vMklBQkE4WXpEUE03dGVtUEE2LzVkTzdjMmRxcVZXdm16Smt6anBLU1lrbFdWcGE0c01odUFpMTFuamdzYm1jbkNSU0xpd3hwMktsVHB4WXRYcnk0NTdWcjF6eEFlMzhlaDdENnJXRGo0U01oOFlhSUFXRmtaV1VsUXRIUytmUG55MTU0NFlYNHUzZlRlcGVWbFhKNWVYbkt3WU1IRzNmdjNxM3g5L2UzTkdyVWlIRG9uTmZEUVFSVkQ0SUxvZjNTaVRFQVUwR29XNk5SSTBGbzE2N2RndExTMGtscGFXa0FNaENpdlFtSFVpYVRMVzNUcHMyYmx5NWRjdEc5YWZ6NDhhYTFhOWVxL2Yxck9UcDI3R2pkc1dPNzJKbHMwcVRKaGxXclZpSVhFS3hRS1BpWk0yZXFrSUc4ZXZVcWdkSDcxbHR2Q1ltSmlUVzZueitiR2VqeFE0Y09MZnpoaHgvR2F6UWFoRWU0Sm13b2ZoYjQrdnJhVlNvVkVrMWlDYnk3dTd1anNMRFFGZG00TG8zcUpWUTBJMFJjanREdDBLRkRhejcrK09PQnljbko2dXJjaVJxdGNyVTN3YndoR2NmenZIVGN1SEVpalEwRFpqSXpNOU4yOXV6Wkd4NGVucXJNekF6UTAxSUNBd05uNXVibXlwbzFhMjYrY1NOUjFiVnIxMkpmWDE4d21UVllkNmNUaWZ1RkU0dTBPMHdCd2xua1hpRE1NQmNvMS8vVDhheUZyNmRVS3RkSXBkSk9Cb01CMG9wY09saEhCcFZLOVUxVVZOUzRwS1FrR1d5dTYxdFdybHhsbmp4NWtxcDkrL2IyWnMyYTIxYXVYQ0VLUXUzYXRYY1ZGQlI0Q0lMUW5tRVlTV0Jnb0hUSmtpVmk5aEdWenp0MzdoVHUzTG56clB0NTFud2UvYjE3OSs2R045NTQ0NFhaczJmUCtmSEhuOXJCMGRxMmJTdC81TWdSUjB4TURIdjA2RkZXcjlmRDJ4WlF1NUNRa0lCL3U3NGZrREpTMXdjRVFTZ1lOMjdjb2MyYk53YzhyOHAvMHMwaWl6cHYzanh1OXV6WlV0UTJkT25TQmZpRitMTnExU29oTGk3T2V2anc0VlgxNm9YMXUzUG45amxQVDg4YmxaV1ZTeEJCUEhqd1FJazh6cXV2amk3YnVuV0xaOTI2ZFZFZTRISWlnUXZBWVhkeEtURWZDRDhFQWVZT1lmVHVtdkFSc0puZzYwTkVRYnRDbkFvYkNVY1FFQ1V1REJzTHIzWmhzMmJOL2dXMUh4TVRZMEVvaGtuNysvc2I1OHlaSTUwNmRhb0M5UFcrZmZ2WjU4Mzd1TlJnTUZTZ0JKemp1RllBcUtCK3NmbWdmWUdtaGFMUVBYdjJpT2hhVFhHRlA1TUlnRTlObXpibGdZSjZlbnBUVWxLaTh2ejU4NnhHbzBGT3hDR1hLNWk3ZDFNZDZlbnBhbkFORmk1Y3hIMzc3VGY4bFN0WDRBTlVIN0RUeHUzYnQ3czlwVWFoeG9KWi9ZMFRKa3pnOSs3ZFN4NGVIdXpnd1lORmtvNnJHTWJMeTRzTERhMXJmdkRnL2h4Zlg5OFBVbE5UWWZ0M0JBWUc5aTB1THY0U0NUQS9QejlibXpadHJQdjI3ZFBWcjkvQW1wMzlVRzYxV3VHY1FoaUE3VlR2d2dKVGgzQnlsQk1hUUM4b1JIa2lDOWMxY0FJUUxxRktCeGc1VkFuQ0VianpRTzRRYy82aFJwMWwyUTlidG13MU96SHh1ckpqeDQ1MnFWVHFPSGJzbUNnSXJWdTNzWThZTVlLWlB2MDlFZUxjdG0yNzQ3UFBGcjEyK2ZMbFdJZkRNUnBGaHdxRlFtWTBHdVdEQjc5ZzNMMTdwMWpvQXBaU1hsNmU4TTQ3Ny94bG0rdWFFRHpzeno3N3pCRVQwMUlrZXRTdVhadDkvLzMzd1NzUTRkaFRwMDV6cjd3eWlpa3ZMK2NCbVhmbzBNRVNFZEVRNlduaG5YZW13dHd4enFZWnFMUDRSenF2Tm1qUVFPalFvUVAvMm11dlFUT0pWVTlBRUYwTThCNDlldGpTMHpNeTFXclZZcDdudjc1Nzl5NUlzcjgyYk5qd1hHcHFha3NBVEMrK09MSjgyN2F0WUl3eGRldld0U0tINGt5V0FVL0FmZ0w5Zkh4Z3ZYSEljY0FSMjRKTURIemZEa0ZvNXR4d09CM1BHbE5idDI2ek9EazVTUUhIY1AzNkRaWVBQcGd0ZS9qd29XZ2FCZzBhWkczYnRwMHdlL1lzTVJadjE2N2Q1Y1RFeEZPQ0lMeGxzOW5NV3EzV1RhL1hLd01EQTYySUlqWnQyaVNYU3FYQzd0MjdtVmRlZVlWQTBHamZ2ajJEMEJMRUZjVFZ6NXVobkRoeG9nV0ZNVGR2M3VSUjBBck40M0J3a3R1M2I0bjN1R1RKRjQ3VnExZWhoNUtJYzRTSFI5aUtpZ29aZDNkM0JtQU9ORkpSVVpFQ2FXbFhHUHlzUlhuVzN3TURBOEZTRmtObXBKaS8rKzQ3bE1VTGh3OGZSbDBEZytydmhnMGJtZ3NLQ3FpaW9rS0V3QWNQSG13N2VQRGdMeTFhdEVnb0xDeGNsSldWQmJVUERBY2F1alljVzZWU3lTRHhwMUFva1BRRE5DNEZXY1ZaOHdrWXVzYUkzZlBZNUxHeHNiSGYzYjU5V3drc1BDSWlnbnY1NVZIV2p6Lyt5QlZ1Q1FzWEx0UVhGQlFxdi92dVczQVlONnZWYWl2TFN0NHhHUFRaYXJXbW5zbGtSRXpNRHhreXhKR1llSU5OUzdzcmhmTzBmUGx5NjV3NWM1VEJ3Y0VRSHFaang0NFVIeDlQWGw1ZVloK0I1eGpDa0NGRHJMdDI3WEtCUWsvNnFJdk81WnA3OWQrZjl1L251SVVuSEVPMVdsVC9LT2NMRFExRkdFMm9XbHE5ZXJXUWtwS0NFOWtValRLUTBrZUcwVVh3UWNiMDVNbVRyM1hxMUNrNkt5dnJqWnljbkc1T2ZpaXlyZEhlM3Q1SVNZc1JENUJJbUQ2d3IxRmQ1Z1RFQmppQnNHZmVmMDBGb1dmbnpwMTNvUDlRY25LeWVMSUF6WHA0ZU5xM2I5OG1DZ0kyTkQwOXd4SVhOMUNXbkp6OHFrcWxRbW5XVDJWbFpkZWxVbW1NSUFoS2hJeklxclZ0MjFZNGNPQUEraU00cXFxcXBPN3U3dmNuVEpnUW9GUXEwWkVFZUw5NGN1QTdyRm16QmtXbHo1eUk4dzJDVGlIblo2Z2Q0bW4vSjhieVNwNkthcFllZWZUMVVWRlJCQ0ZQU1VrQmJaMSsrKzAzWWZUbzBXQnBXZWJObTRkTkhRNG5VS1ZTMlpIWk5ScU40aHFIaFlVNUJFRW92SGZ2WHR2dTNidC9ldlhxMWQ1VlZWWFE0TUFQVmtva2t0Rk9naXJ5RkhxR1lRbUgxR2cwSUVjQmJBVHBBSlRpZ2JqNnA2TW1ndENnU1pNbWwyclZxcTA3Y2VMNG85d0J2TnZzN0d3K01URlJqR2RidFdwbDI3ZHZueXc4UER6VFpESk5yRldyMW82Y25CdzBwMnpJc213SXdpVzhyMG1USnBiUTBGRHBnUU1IWEFqWkxwVktGUXNWSjVGSXZFQjFRMTBmZkFkM2QzZVIzQW9iNmhxdVlwTW56UW9WVXU0eUtSMlVZLzcvekhqWm9LSUNwVlprWU5ka0FERUVEeEhjQ3d6Z0I4SEJ3WHhNVEV2SDRjT0hDaU1pSXR6UUF3RjF2ZjM2OVRPZlBYdFdEcE1FV2hyS0NKczNiMjVQVEV3OHdYSGNzTGk0dUdNSERoeW94WEVjdXF6Qm4wTlNEWGdCMDZGREIzUGJ0bTBkaVltSmJFVkZKUWpBaXJ5OFhQZzR1Rkc4LzArVGRjOFNCSzJucDJmcWE2K044Zm42NjY5RXh5a29LTWlTazVPakdqNTh1R1hQbmoxZy9ZaW5qMlhaR3pFeE1UbFhyMTc5SUR3OC9HaGFXdG9ETHkrdmtvcUtpdDR1SWNEN29xS2l6Q0VoSVpMOSsvZmplZ2hKKzBpbDBrT08zNUVaaFU2bmN5Z1VTaW9wS1piQkxGeTRjSUVPSGp5STZ3dHVibTdNa2lWTGhJa1RKNHIzalR3OW9nN1htREpsQ3YyOGNnVmREZnpIRkFJTnpIZFEzMGxUYU11V0xYK0F5RjFVTlBnK1lHcnYyN2NQRVpDQVdzVkZpeGJSL3YzN3hXcHZsK2FhUG4yR2RlblNMN2lYWG5ySit1dXZ2eUtIc1g3a3lKRjFFeElTcEE4ZVBCQk5KaEJIa0ZTYU5XdG11M2J0Mmt5dFZydWxZOGVPTnc4ZlBnekJRVlNIQ0E5Rk5YSi9mLyttNDhhTk0xWldWcUpzZ0NrcFFWbi9mV2xXVmhiVytZN1RRWHhxUDRVL0V3U1daZG5FalJzM05Yejk5YkV5RktkNmVYazVXclJvWVR0Ky9EaHFBeXhIamh4eDJXTFlWdkFHRDBWRU5Fck55RWdETDJHaFJxTlpXbEZSZ1RwSEVYY0hwVDBrSk1RZUZCVGtpSStQQjc2UTcrYm1WbUV5bVR3Y0RvZFhpeFl4anBzM2sxVncxRURJREF3TVpLZE1tU0o4L1BISHRIYnRXaFIvc0tnT3dvYUQwQUlIRTRnazJFWUl2MEFMMzdyK1o3b2VYSjNBWEpOelcvUDNETWl6MHoyZXBUZmZmRk0wV3hCRUR3OFBnRmdBaE1RU050UTdabWRuZzdIbEFCalV1WE5uMURlS21zNFo1b0Y0QXFJSitBS2ZjeHczeW1xMXZ0YS9mLy85V1ZuM1dXOXZML1JZQk05RENjMkRmRTF4Y1RFU1pQWDgvUHlDYTlXcWRUNDVPUmxOdThDU0Fxd01qc1NQSFR0Mk5FSm96R2FydEZXcmx0SnAwLzZsQ0FtcFkwOU52UU0vQWlIanEwK2I2WjhKd3JvdnYxejIwcGRmTHBYbTVlV0pmUTg2ZE9oZzFXcTE3T0hEaCtYTm1qV3ozcmh4QTlLR2s0d2ZyMXExYXFXWGxKVDRPUnlPeU5EUTBGTjVlWGwremhJeDhYdUNnb0xzVUh2Ky92NVdZUEpBS0x0MDZmTGw2ZE9uTDdNczIzbm8wR0cyeXNvSy92ang0eHFvUm53R0JFMzRGU3RYcnVSaVkyTjFPRlhnTW9EbDlOSkxMMUdmUG4xbzdOaXhkUExrU2VyY3VUTnQzN2poSHhlRVNrOWZPSHNvUEtHTkd6Y1NpTGxJRkFGeGhIQ0NhQ0lJQXYvR0cyL2NLeTh2RDF1eFlvVzlTWk5JTmlIaHFsQllXQ2hLS1U1OHYzNzlySHYyN0RuMDRvc3Y5ZGl5NVZmUTYvZEtwZExtUC95d2xrTVlDMzRFZkllY25Cd0ZTRUZKU1Vsd0xGdXExZXJKTE10K1l6QVlnQ2FDVTRDRGVJOWwyVG80YkxWcjE3YnUyYk5YOXNrbm45RGh3NGNRWHRwdjM3Nk45VWErNVBpVGhPRnBndEIxekpneGh6SXlNdG40K0hQaWpiL3p6anRtZEVISnpjMlZnTW5qNXViMnNLcXFDbmdENnZsODFHcjFWM2E3dmJmZGJ1L2c2K3U3QUFoaVNVbUpScVBSMklBYjRCcWhvYUVpYnhBZzFJVUxGd1NkVHRmVFpyT2RzMXF0SmZBUGV2ZnVJMWdzWnB1bnA1Y1lVVGo3SXp6bzFLbVQrdHExYTVyS3lrcVJ3ZXZuNXllZVFzQ3pDQzlmZmZWVnFGQ3hkZTZtSDc3L3h3VUJQZ0o4RjVUcTlldlhqMTUvL1hXeG9oa0NBRk9HRVJ3Y2JNdk96dDRiRlJVVmw1eWNMSjg5ZTdibDBLRkRMQTRQa202SUVJWU9IV3Jac1dNSHA5VnFMMHFsMHRTS2lvcUNGaTFhek9uVUtaWWRPM1lzR3hQVFFnSzYyYTFidHhCUjJRMEdJNVdYbHdFWTJ1Ymg0WEhTWURBQW4wRitBVDJXa0NFRkZVMEV4Um8yYk1qdDNyMkhtaldMUm9zZXM1dWJHL0lhV0Q5b0QxZDE5U09aZUpJZ2hQWHQyL2RtUUVBZysrT1BheC9Ccm1nR3VYNzllc2RMTDcyRTE1QVAvOVVKWHc1UnFWU3RkVHJkWjBWRlJmTVF1NnBVS215dUdCVTBidHlZdTNidG1sb2lrVGpDd3VxTGRRL3A2V21JcTMvdzhmRnRWMUpTRERSVHdUQU1Kc0I4ODgwM3Roa3pab0JnQ29jSkorc2d5N0xoYXJXNmpzRmdrQVVHQmxvQW50anRkbVF5bWViTm13dWJOMi9PWWhnbXVGZXZYdXl5aFo5SUx2cjk1WUtmWjlvSW1BWnAvWVppb3V6S2xTczVHelpzS0Nvb0tHaTZhTkVpV1hVSHNtM2JkclpMbHk2QzdqNGxPanFhQlRGbisvYnRZa1BSamgwNzJ1TGo0K0VQY1U1Q2ozOU1UTXk5YTlldWRWVXFsZWVYTFZ2R2hZVFVrUThZMEYvYXNXTkhVM3g4dk5yVDA1UGZ1WE9Ycld2WExuQVNrUkpuYTlXcWRhdXdzTEEya21IT1NBTDBOYVRIMFFaWTBHcTF3b3daTSswTEYzNktRaGg4am5QV1cwQm9YTFFDY2M2UEMwTGR6cDA3WDIvZnZvTnEyYkl2c1Jtd2dSSWtpUTRkT3N4Lzl0a2laTXpBemdIUkFlbmUyZ3FGSWlZNE9HUnpSa1k2bWg4aDJYRWZMZlZzTnB1c2VmUG1ScWxVS3IxNjlTcDhDYkZwMUxsejhmYkpreWVoQlU1WVJFUkU5dDI3ZDlHTTZqdXgxUmxVaTQ4UGZmTEpKdzZvK3ExYnQ0S0o4N0hGWW5sUnBWSTFSbVRSb1VOSDgvbno4VXFGUW1FRHBjNWtNcUh5K21KaTRvM1d5NWN2Vi96NjAxcnBQKzBqWlB3UEErS1k4NzRiQzRLQXhYODBCZzZNcyszYnR4ZUpIN0M1S3RFVUJQaEFzMmJOek5uWjJkTFMwbElab2dKa1FrK2VQTG1xWThlT1BaT1NrbWJyOWZxZ2pJek01Wjk4c2dCYVJ2cm1tMi9xVjY5ZURkS3NjTzNhTlJ0S0FoSVRFOUdEQVFVMkhscXQ5cmJCWUVCa2dQWis0Q0tBekl1RUdhQm1WK1JoeHRwMzdkcVYyN0JoZ3lRL1B4OEUxbGJWdTZwVUY0UXVmZnYyM1JvVUZPUytZOGNPRmljWGpnNXMyZWJObXgxejU4NlYzTDE3RjFVMGlJTmNEUjhqd3NMQ3ptZG1aaUt5aGdjN3pOdmI1NGVLaW5JNWVpTDA3ZHUzTWljblIrNGtld2pCd2NGV2s4a2tzS3gwcmRsczNHMHltUTd5UFArelVxbEVRWWc4S2lyS21weWNyRVNFZ0JYbGVmNm1UcWM3ck5mclVRcmVBb0lBKytmbTVvWjdjWVd5Z01HUEh6aHc4T1VEQnc0b2ZsNjFRdklmRkFSME1vR3FSaTZsbWNQeFAvakY2TkdqYlJzMmJNQ0dERU9LV0NxVjlvMktpdUpuejU3TkR4OCszTlZNaEFZTUdHamF2MzhmUXVrQlBqNCtxMHRLU2hvZk9IQXdhK25TTC96UG5Ea2p4TVVOc3U3ZXZVdkVhbGF2WG1NNmR1d283ZGl4QTFvWnJHMFhUb0JhVE93THFPNmlYKzQ4bEVpY29SNUZiUHpWdm4xN00wek81czJiSmNlUEh3YzRBejZKeUZ1RUlFejA4ZkhwWDdkdTNjNUZSVVdhcGsyYmNraiszTHAxUzBTc2xpMzd5dnJwcDUvSXlzcktnQWtnNysycW5nbnc4L003VzFwYVdwdmpPTkMzTWxpV0xVTldNVHM3VzR3bXhvOGZiN3g5K3paNzRjSUZFV3VvVnkvTWV1OWVKa0taRm1xMStxTEpaRUt4U0cyRVNXYXpXVGx0MmpUVHVuWHJsS0NaT3llMFdxZlQrU0ZMcUZLcCtnSTFneUM4ODg0N3dycDE2NlIzNzk2RlFJTEVjUERiYjc5OXE3Q3cwT3VyUlF2L1V4b0J3b3JzM20rK3ZuNTM2dFFKNlpDUWtQQW9hVFZ1M0RqVGp6LysrSnRVS28xeU9Cd2JwMDE3Yi9IbzBhT2x3NFlOWTR1TGk5RENUL1M5Y09DYzlTR0JYYnAwUFhQNjlLa1h3c0xDM0N3V3k1N2MzRnlQNGNPSE83WnQyeWJ1eFJ0dnZLbHYzYnExZlB2MjdmeWhRd2RCeElWL2dKQVF2TVE1cUQ5eEVsUmNtZ21mQTRFSUptT3hRcUg0eXMvUDM3WjI3UStTNHVJU1p0YXM5KzA1T1RuUUxuTUEyandjT1hLa0orSlBtODFPMmRrUHhkNUlEeDQ4Z0xxWjJiOS8vMVVIRGh3QUlSS29qZ3VVVUxtN3V4KzJXQ3p0clZZckVpTElrSFgyOVBSRTExRFJ2dU5PNXM2ZGE3bHk1U3A3OU9nUjBWbFVLcFZvUHdOdmFxaFVLczExT0J5dkFZcDJPVStUSmsyMlZGWldNZnYyN1pIZ09naEpkVHJkUjNxOS9weEtwWG9UQzRib0JXWHFQWHIwbEg3MTFiS2Q5Ky9maDlDbHJWeTV1bFZsWlVYN1R6K2NvN2cxQUZyeW54azlUMXlqZEwxWThvaFlYbXloMDdkdlB6bTZ4T3pmTDViT2krT1ZWMTQxYnRxMDhhaFVLZ1ZYNDhpQ0JaKzhzWGZ2bmdaSlNVbHNiR3lzN2NTSkUwZ3BvOUVtV2dpaFFHVytqNCtQbEdYWjRLS2lvb2tTaVdRengzSGFvVU9IZHQreFk0ZDRrT2JQbjI4WVBIaXdwbCsvZnJiYzNGeHNNa3cwdUpTMTZ0YXRtNW1WbFlWMUJ6dTVlbzRCcEZVVTZNQ1VJOVQ4eWRQVHM5NnlaVitCMlFWZWcvRDk5MnUyUUNOMERBZ0ltQzhJUWkyZVIyL0g0b3M4ejZNREJ4b2FtWnMyYlhybjVzMmJZQ1E5U20ycTFXcnc0OGFoT05SdXQ2TVRxaUV3TVBDV2g0ZG4wSzFiS1k5YTU4MmMrVDRpQm03Rml1V1BTclNjMVVLQVZSSFhkbWNZQnBwR2ZKakZuRGx6YlVlUEhwRmN2WHBWTEJpQituTjNkNzlYV1ZtNVNLVlNMWVJHd0h2cjFxMW43OXUzTDc5MjdROGpiVFliV3RyNXpKZ3hJeWNtcHVXczhlUEhxYW9xbjlUTS9POFJqS1pObTlLdDN3dHlQcWhWcTFabGNYSHhtSzVkdTlicjNyMjdldmJzMlJCSzBkd09IejdDdkczYjFpdEtwVExWWXJGSTJyWnQyL25TcFVzTkVIYWpxeXVTZHJHeG5ZMW93QkVYRjJmY3UzY3Y3SHVkK3ZYcnAyWmtaRURENGpwVFkyTmpwMlJsM1plV2xKVEkzbjMzWGV1WU1XTVVIMzc0b1I3RlFqZHZKc00wSUFxQUkvaGU2OVp0RjE2NWNnbkpRNXlFSno0dndsblhnZDRUb3dJQ0FnTGMzTndPNXVmbkwzUDVDUGkvaStUNHVNdU55aDNjcElqYnNpdzdTYWxVTGJOWXpIcWU1OUZqOEJkL2YvKzZack01dFZvakxYSFZmWDE5dVRsejVqcmVmZmVkNnFRUEpFSmdXekhTUER3OEJsWlVWSWpDZzVaNkd6ZHVkS0FENitIRGg3SGFQZno5L1hNS0N3dkhLcFhLamM0aUdmR2U0Y0JhclZiUXN3Q3NySkRMNVJPM2J0MjZkc0tFQ1ZwMFR2OTd0djNmcndMODR0YXRXOEQ2NnpkbzBHQlZlbnA2UU5PbVRROEdCd2QvYUxjN1pNZU9IUlcxWDc5Ky9VMEhEeDdJbE1sazYzaWVIOFp4WEcyMElZWXdsNWFXU3FIWkprNTh3N0pteldvUlFFTTYyV3ExaGpacTFHakpnd2NQanB0TUp0RFczM2o5OWRlL3dxWmZ1blNKWGJseUZkZXpaMDgwRERkQjRGSGU1bkE0QnJtS2ZDSWpJMC9uNXhlb1MwdExVSmtGbXQyemFOUllKekZ6OGl5SStmR1ZpRkVxbFVjRlFVRFpHTFFFYUdzVUVkRndrMXF0R256djNqMjJzckt5K3VrSEFtai82cXV2bUlLQ0FnZ2FRaGFvSjBqcmNMbGM4Yk5Hb3dZM1FHUXhLWlZLK09OQUpjSGpRd3U3UmJWcTFVb29LQ2pvclZBb1Q3SXNBM3Y2Q0RhVVNDUllRS2crcU1jeFk4ZU83WHIzYnRxbzgrZmovNjBjL3U4U0RLY2dvTTNnb3BDUWtHTVBIejRzQ2d3TTNOV2dRWU4xVlZWNnlmWHIxMFQvcUZPblRxWno1ODdoZEU2VXlXUWI3SFo3aGt3bWF3bjZQUDd1N2UzTlIwWkdvb2hGZkQ4b2RNWEZ4YStqejdTbnArZVc4dkp5VkcrMSt1eXp4YWZQblR0SGh3NGRsS2FscGFNNGhiTmFMU2lBVWNINXpzN09CZzhUNFNBMlBVb21rMzJ2MCtrYWxwV1ZnVW1HQ3U0YWplY1JCRGVHWWM2clZLcHdNSlFxS2lyRVV4MFdGZ2IwOEFIS3hJS0RnNnRTVTFNZlBUUVRaZktUSmsyMmJ0dTJUWktSa1E0bkU0UUpPRlR3WnV0N2Uzcy9LQzB0ZldSS1ZDcVZ6V3cydTdxMWdZbTd5dC9mZjE5aFlXRlRqVWFUd3JJc3dCaXgrU1dFR0pYQkZSVVZpS0ZCb2dFeTUvRDI5a1pKR0R6cWYyUkVSMGVYSmljbm84MWdXT3UyYlJPdVhMcjBtWStQenc5bXN6bnQvZmZmUi9HT2VCQWlJaUpzbVptWm5NUGhhQ1NUeWRMdGRqdE9PRFpHTEI0YU5XcVUvZXJWcTdhMHREVFJ3V3pac3FVeElTRUJCeVFxSUNBQVBSYmhreDJLalkwOUZCSVMwdm5Rb2NPWmFXbHBqYWROKzVjdE1qSVN2U2psNEhXZ0FhbkQ0VUFvQ1JvYXhzdWRPM2ZPejgzTjNacVJrUUVJR3Y3Yk04ZnpDQUpPS0VLaHR4SEp1SzRjRVJFeDFlRndmSjZabVltT1pSVTNiOTRFMkNGZXQxMjdkbzZHRFJ0bXJsKy92ajdQOCtBN3dyZUEycXBRcVZRemVaNEg4T1E2NGFKSjBtcTFEZ0JIVGdMR3QvNysvdDhXRmhhMkNBd01TczdOelhGNzVaVlh6QThmWnJQSnlVbm96UUNocWVOODcySk0yc3ZMYTM5cGFTbHFILytSRVJNVGszbjkrblhZNVNiUjBkRlhrcEtTRUsvdmJ0MjY5VmFMeFRJb09UbFpuQThxdzhITk5CZ01hcmxjWG15ejJiQlpQek1NRTlDMWF6ZHV3SUFCM05xMVB3amdkK0Q5SGg0ZURzRHZOcHN0V0tuVTlCUUV4MkNyMVRvRVVWVzlldlhXSzVYcW9tUEhqcjQ4YUZDY28xMjdkdngzMzMwblJoSStQajcya3BJUzBNN1FxYjY2S1lEVGlFNnhTR2loMTlXZmpwb0tBdXc2SkE2T0hmb1JpRm1zeG8wYmE0T0NnaDQrZlBnUTlRenNpQkV2Q3A5OXR1Z1BhR1NmUG4zTzd0MjdGNmNBbjBQSkdpaldmU1FTeVFndkw2K1hpb3VMUlU4YnNTNW9abzBhTmJaZHYzNE5wMm8reTdLVkhoNGViNWVWbGZYeTkvZS9YbGhZNkliM2RlN2N4ZEtoUXdkdXlaTFBOVmFyRmJ4K25EYmszTWQ0ZVhudC9FOElRdVBHalg5czNxTEZTNzlzMm9UUVRMbHIxKzdVSVVNR3Urb05NQ1gwZ3NBenBMdzFHZzE2V0gvTHN1eWJVNlpNYVl5bVdCNGVucUNrYzcvOHN1bVJnNm5SYU5DeUh4dDRXQ2FUWmRydGR1UUdFQjRQajR5TWZHdmR1cDg3M2JwMXk3Rno1dzVoNzk2OTRuY2hyUThDSzgvemlHQWVyMmRBQ1QrWVBXalNDYi9tcWFNbWdnRFZoVVZHMUlEUzZrZTBqRVdMRnZXTGpHeTZNeTV1b09Menp6KzNEaHdZSjBSRk5aVlZBMVk0blU2M1NhL1hvelFMZ0FkaVhkUUlCS2pWNmxLZFRpY3JMQ3pFcGpNb2drRW5WclBad2lQSlpUUWF3bjE4Zk40b0tTbnA1L1Fua213MlVYc0FMZU1IRHg1aXZYRGh2Q3cvUHg4TEI5c0tkVDNSeTh0cjBYOUFFTUw5L1B3MnVMbTVkY3pJeUFodDFhclZ3RUdEQm0yZk8zZXVpK01vMW50NmUzdWp5M3VJdTd2N2hzckt5dVFYWG5oQmNIZDNuOUs1Y3hmaHh4OS9aQ29xS3BpVWxKdVAyaGhIUmpZMXBhVGN4RnIxajQyTlBYRDI3Rms0ekRNUUtFVkZSZjMyNXB1VG9vY05HeVpyMEtBKzhoTUEvTVRIRVBuNCtEaEtTa29RN3NNOFB0NEhBWDBxb0xYQVZYenFjeWlmSlFqNE82cWJNUUFtVmIrUVpQdjJuY2xKU1RmcWYvTEpBdm12di81bVEzbjc0c1dMaGFJaXNVNEFBN2dEekFsVU9MSmVpR1hCc1IvdjV1YVdDZjZpVHFlelZLYjRPK29BQUNBQVNVUkJWRlZWcWJ0MTYxYmVzbVVyMVpkZkxrWE5BYXFtRC9qNCtCaEtTa3B3NGlhcDFlckxkcnRkcnRGb2VKaUVKazJhMk9WeU9ZZ1lycGE4VUlGOS9sT21RU3FWZG82T2pwNkgvRUJNVE15Yjd1N3VYNTArZlJvbmt3a0xDOU5uWm1acWZYMTlFWTgzOVBYMW5WdGNYT3lsVnFzL1hyNTh4Y1ZWcTFZeTc3enpMcjN5eWlqa1k4VCswODdUYlhhZWJoQ0ozVlVxMVFXejJZejVXMXEwaURuY3BVdVhMbE9uVHBYSHhRMjArZnY3Z3pRc090bEFEQzljdUFETkFsd0c1dUR4Z1RXQ2RrRWs4WmZhNjRIR0RwNGM2RkYvNEl0Tm5UcTE2OHlaN3grdlV5Y0UrUWgyd1lJRnR1Ky8vNTQ0anBmbDUrZTVCQXdlTGRCRERCQXBBSFRnWmt4eXVmd2k4aEdSa1pINmxKUVU3V3V2amJHZU9YT2EwTS9JYURUaTVNZDRlbnArV1Y1ZURydjNjWjA2ZFk0L2ZQaFFOMi9ldktwNTgrYUJYczZzV2JQRytzWWJiOEE3eG4xQ1kvbjhwd1NoVTZkT0kyL2Z2dDJ2dExSMGRFUkV4Q3ZCd2NGcmI5MjZKU2twS2FHb3FHanpyVnNwR25kM2Q3NndzTEMxdDdmM3NNckt5cmpvNk9qeGI3MzE5amswMVI0NGNJRFluOEhQejA5c3NPbGNJd0ZsNnhVVkZSRHEwL1hxMWR0eDc5NDlWS2pqMFVETGV2YnMrZGFZTVdQNXI3Lyt5bkhtekJuVVFZcmFGUDRJU0R2NStmbHdtdEhINFVtYmplYWdlQ3dod3MxLzB3eC9waEhnZkwzb3BEbjlXL2V3SDMvOGFaK2ZuMS9mZ1FNSGlPRVEwSzZEQncvS0F3SUMwS2pCcFJHZ0FYNHY1Zm45QVZqZ3o4SEwvNkpXcmRwdkZSVGtxMGFOZXFWeTI3YXRiaUNXakI4LzNuTHk1Q2xaWm1ZR05FaU11N3ZuNXNyS2NqaVhLNk9pb2c0bUp5ZHJYM2hocUJYOW1qNzhjSzVxMWFwVjlsbXpab0c1aTJKUStCNStYbDVlNi84RHBnRVJ6OXVscGFWSUJuM1dwRW1UUGl3cjJUTmd3QUFybmdpM1pjdHYybE9uVGltQkdONjZkUXVjZ1RBUEQ0OHZLaW9xZktkTW1acTdjK2NPTjFmWHRaa3paOXErK09JTG1BY1IrOEJ6cGU3ZnY0OFdQVk5DUTBNSE9SemNCems1MlcwVUNzV0F0OStlc3BWbEdmdXBVNmVrZUJ4Z1Nrb0tzcGtnK3hwWWxwV2c1WjV6ejNBNG5qUUEvb0hSaFBZRmZ5aFRlSklnNERWMDRvQVhDdnY3YjcxM2dvT0RJK1BqenljT0hmcUNrSkNRSUVwemJHeXM5ZXpac3dybkF6UmRYREZzSXB3NWxKV2prQlM0QXpoMkJVRkJRZHFjbkJ6Tml5KytxRDl5NUlnR2xLd2ZmdmpCbnBCd2pUdDQ4SUFzT3p1N0kyRHN5c3JLVFRLWjdISllXTmozcWFtcFNsUUtyVjM3bytXVFR4YUE4Y3Y2K3ZveWx5OWZSb2s0d3EzdWJnd3R2VnBmOTQ5RkRVTWVHak52VzNsRURRaWZrWTdmNitIaE1jVmtNbjJ6WWNPR3FoczNiaWhSYVkxTlFzbGZmSHc4b3FWN25wN2UrOHJMU3lNbVQzN3J6c3FWSzBRSDBVbjRGV2JObW0zNTdiZk5vdE1jR3hzTDNpSkNiYlFBb3ZEdzhQdHBhV25ZaDZyZzRPQ1V6cDI3Y0ltSjF3VWZIMTg2YythMHlNL28yN2R2QlI0d2V1M2FkVVZ4Y1JIV0hKbkZwdzNzRFNyWTRUeTZucGozYjRBU2JnWWxVNEIvWVd1ZW1OaGZ2SGp4dHgwNmRKd2NHOXVSclI5S3pMQUJSQjFiU3dSM0hZZG5KQW01QmNRY1BrVzA3d2dsbEZaUWIyZXZJV3dVNE9CY2pVYWJpY2FZb0htQmNBbTFkdkRnUWRRUzhHRHpMRnEwaUUxUFQyL3Y3dTUrdnJLeThsTWZIeitQME5DUXlRa0pDV0ptOHN5WnMxYmtIUVlOaXBNR0J3Y1hwYVdsSWRtQ25NZDRONFkrdlJJcys4Y0U0WVY4ZStadHV3anJmdUhzbzRUWS81Njd1L3N2alJvMWV2UHk1Y3RpTjNlWVN6QzlqeDgvamtjVXJQWDM5NzlUV0ZnSUozREgyYk5ueFdkT2RPN2N4UjRiRzh0Lzg4M1hFckM1OFJxYWs2SmZWV1ZsSllDM1N6RXhNZk92WGJzR1J4Z1BGMzB3Y09CQTl4TW5UaWlhTjI5dVEzZFlhSkxseTVmYmxpOWZJYktlYnQ1TWhzTUtCeHNWVFg4Mi9sQXVYMTBqd0tzRVJvMHc4US9sVUk5ZHpXZlNwUEhwd1Y3NzNWN29YY0FhVEVRbU0wUGVIa1JvQVcwd0NtUXlFOW5zUkJ4SG5NRkl4bi9OSTBkcHVTaUI0VEtackkxU3FUeHROQm9WNGVIaHR0VFVWUG0yYmR0TnI3NzZpaHExaGYzN0Q3U2ZPbldpMEdReWRmYnc4TGhkVVZFeE5TZ29wTk91WFR0ZmF0V3FwVmlwdkgzN0R0dWtTVzlLWTJNN08zYnMySTZ3RkhIeVFiU3hnVWI0RHdrQ0JCcy9XRU1BV0dna0F1MkgzOFdvb1gvLy90WURCdzdnVUwyQjhuYVR5ZlJXWUdEZ2dOemMzSUZ3ZWk5Y3VJaGFURHY2SUxqV0dHVUFhTitUblowTmIzK3hXcTF1RGtiNHZYdjM0RFFPMEdnME93RlRnL1NETmtTLzkzWk1jWXdhOWJMWWhTMHo4NTdVYkRZaExRMC9vOGFqdWlDNEVqMS85bUZKKzlhMDdydFBtRmR3QTI0NlBHQ1RxS0NZS01DZlNLdGhDSDBtQzB1SUtxdndONEUzV1VnNGY1WFlReWZvL1BVVWl0VnF0UXUwV3UxMDBLMWgyK0xqNDNWb1lZTm1sMnZYL3VBS3Y5Q0lvdFRiMitkSzdkcTFWbFZXVnZydjI3ZHZSTE5telhDL3pLUkprMnlvbk9aNTNzN3ovSVdFaEFTRWozZ1c0emdkMGFhcklUTGdIdi9JR0pKdlQ3OWpGeUZkRUU1dzJqR2dhaUdJZnpDMWNYR0R6SHYzN3NIcncxRHNZektabHZyNitwNHZMaTdldjJUSkVydlpiT2IyNzk4dlhMMTY5VkhXMHNmSGgwTXY2RXVYTGtHNEFaK2pmMVZpZm40K1NDNm83czc1WUNwNVpUMGdLcXY0L2JISEczNDVJU3hldk1SODdOaFJWWXNXTWJacjF4SncybEh2K05UMlBvOHZ6clBDeCtydloxN29TNXUrbWtjdjVoYVNKTHdlUTNjekJRb05JWkpMR1dIVkR4SnUrekdIOUdFdWtkR0ViQ0tkOHZXazZRSkRDLzE4cUUrVGNETGVTYWVWRC9JOWg3bTV1ZnVYbFpYS1I0NThpZnZoaCs5Rnh4S05ubHEzYnUxdzB0eUJzK3Y4L2YyUEZ4WVdmdWZuNStkeitQQ1IwWXNYTDdaczNicEYzYTVkTzF1dFdyVzRmZnYySmVsMHVvenk4bktZTVlTM3FQeGRFeDhnbWVnai9mdnpUcHdnVUljY1IzYUZJT2IzZ1JTNm5ES0V4b2lLL2pENjkrOXZPbkRnQUtoamZiUmFiYkhCWUVCa3N6MHNMR3pzdEdudkRicDVNNW5mdlhzM01vdElIb2wrbGIrL1B4Y1oyZFIrN2VweHllUXhkRFhySVJYZHlaVFh6ODZ4TVZZN3pUTVl5Ty9PR1dhRm53L1I3WFNpUFljRnF0MEFRbkNTUDN6NHNDWW1Kc2FHSWlTNzNZNldPVUFtYXpScUxBaXRtdEVYVzcrbmR3cUxTTlk0bktHYmR3UnEyb2loVFRzRVd2NnpENi9VMUhGY3YzN05kYUxoa1lJdGcwZ0J5SmhVcWFUdWFoVXQ5dkFNNjE5UWtDOGZPWElrSHhuWmxLWk4rOWVqUWxOVUFpT1hVRnBhQ2lRc05DQWdZRjlvYU9qM0tTa3A5cE1uVC8zcjZOR2p0Z1VMNW9PK2hxb2dhVVZGQlpKUWFMUUpVNFk0R2FGVzJoUTNOdVF0ajcrL3RtRzNnYU5aWlR6VVBxSXBkRzJEdVVONUg4SXlNUUZYYmFEOHpyWnIxeTRreExxakl5djZUNFBSTkdUSWtBVnVidTV2RlJVVm9uVy92RzNidHJhclY2OWk4eVRCd2NGQUY0V2VuWFcwOGV0c0tjL2pxZlpFWmd1UndVUkNSU1h4VlFaQmdzZG5WMVFSRlpjUnBXYjYyL01LSlhROUtVOW1NRW41b09BR1hFcktIYUMvT0ZCb0FmVE1VVk5CaUR5emc3bmlwaFBrb2NHTUpQT0JRQTNxTXZUeFVvRysvb0dvZnYzNlNMQ0k5c3I1alVoUGcrRU10QXVsOU1oTlRIWjNkMy9SeTh0clhWWldsbXJldkhtMmpoMDdPWHIwNlA1SUxXSnhXWlp0eXZNODdKczZPRGg0dTlGb0hGMVJVUkYwNmRMbEpUdDI3QUNJWlAza2t3VzZXclZxUVFoUVdBb1BHWjR5cmdNbmNhc25TN1ROWDBKQnNyOVBLeGg0Z2VMeUhaVEg0UkZCdW4xNnZSNmVQRkJYQ0QzQ1loQnVFSitMZ3QydFd6ZTdsNWMzdDMzN05uam1YVWVQSHIxdnc0WU4wSDU5Qnc0Y21CMGZIKytMR3NYZzRHQ1UvU0ZKWlVGWlBqS1NLU2twOHJmSDFYSXMrMGg4YkZDTkJwNVhaYlA5cm8wcktvbUtTb202RGhPT0NJSm90cDQ1YWlRSUwvU2pFK3UvWmpvOXpCV2tXaTJhL3YydWt0NkJPMFBFNFRtUFY2OWVyVjVDRHV3QXB4UXFHeGc0ZnFBUzF4bU54cGZnSDhET0R4MDZqTy9SbzN2MWdsVjQvbER2Q0FmbFFVRkJHM055Y2hBUmxCdytmR1RqenAwN21EcDE2dGptekpuREJBVUZBVjVHZndWRUlxNW5QWUZRSXpwSm9WS2k5WDVTOHNjRElmK1h3OGdMTkxISVFkZCtoMkg0Mk5oWXc5bXpaMkcvWGExcE1FOGdxREFYOEFsbzFxelpwcXRYcitDaG5zalA5T3phdGV1S3UzZnZSdVhsNWIwWUVSR1JjZmZ1WGZBUWhCTW5Uam8rL1hRaHhjUTBGeFlzV0NEdjFxMGJIamdxZjNzc0Njdm1zWC81NWlzcUJmS0xFZ0FDSWluM3Aza0czRzlOdmtoK1pnZFR4ckNDc2xVMEk3bWRMcENQSjBPTk92OGVIZUJMdW5idHFnR0E0bHh2MU9VRHZjSVFHMXc2dzhha2wxOStPZmYyN1RzYXRJQUpEdzkzN042OXg5NnhZd2VwcTlPcEU0SUdHZ21vdEptL3YvL2F3c0pDMkg2Z2lLZE9uVHFGcnVyMkpVcytQOStwVTZjdTU4NmRRN3lOMEFxVUpDQ1c4SllmcVFFL2xtaWhGMHNkVlN6Nkl6MjNPRURnYjlvNG1sM0tVNlpETEVweElIT0l4eElPR3pZVS9ndkFJZ3hzTmt3VWhETGYxOWNYWFZrc0JvTlJFaDkvRHNJSkFDZXlSNDhlbTQ4ZlB6NlNZWmdVVkdldFc3Zk9nYWUvZnZycFF1bjQ4ZU1kNEJ3Z1g3TjM3eDdKb2xsRTB5ZjlkWTJXOVZDZ2lFN2kwOUtRTlVhTDRqOGROVm1kUWRrSnRMMnFpdGc2SVF6N0lKdm81QVdCcGlCOTlQdElxVisvQVp1UmtRNW9FNHhpb0h3Z2xlSmtnaUdMN3dESjA3NTE2N2I0eVpNbkFZYVZnSE4vNTA0cU4yclV5d0JReEpvRzUvV1FMUU0yUHNITnplMjdxcW9xWEZmOTRZY2ZYYjl4SXhGRkxkeUtGU3UrSERseTVPaXRXN2ZLZVo1M2tUTCtUM25YQVo3VCtmYnY1MzNQTzdJWGljZ1NRaElxSWtQTUlFYnRVU05HcXFvdGJlMVZxaWlsdFVkTHFhcE5FWHVsUkkxV1N3a3hJcFZVa0JEWkNZbXNkNTNudTM3SGUzeVIxaXIvNjJ1Ly8zTmRMdFc4T2U4NXozT2ZlLzd1MzQzR1Fxam94eFl1MnNFQ0NRWWwxVkl4MGpDSk5PdUptNEsrQTBoWHFwN1RsbUtSZHBid1Ivei9NSUUvL0hCWUFYTHkxYXRYR3lkUG5vUzBMY0p0UkN6SWx5Q1V6ZmIzcjFzS1loZ0hCd2ZoMUtsVENCK2g0UlMrdm40M2s1T1RPa0VRWnN5WVlXamYvblhsaUJFamVHeHNyQkl6TERRYXRhbHg0eWJzd0lIOXduY0xHUTNxOHp6SDg5ZVBjdkVxcDJHZk5OQmZ1blFKMEhXZ3pKNktWbnJtTjJrMXRPcCtFbnM3SzVkVTkrNFQrZmtRUlkza3REdEdtcThOYXRnRmRuWjJjV1ZsWlJ2MWVqMVNtRExwczZ5bW9SVUMzZHpjQm0zYXRIbGVSRVJyMmU3eEkwZGlEWXNYTDlMSHhzWmFWZkF2NEpFalNUTldwVkxOTXhnTUNOTjJEaDc4OWkyUVg5V3NXZE80YXRVM1VNT0pDb1hpSFZFVXdTSUduK1Nob2ZyejRxaFdTaTM1U3VMdExSaUZhaGlyTGpDeVVqQlNNaUs0ZnlXY1U3YVIweVU5cDloU1huckRLUGtjankya2tNRUUwNnRYYjRaSk1KTW5UODZNaTR1REZzQSs0bmxoTGdxVlNzRlFwWXFUdmtHRFFGVnM3QkdFZlJLSXg4ZkhKelVsSmFXSnE2dHIrb1VMOGF4Um8xRFROOStzRW0xc3JOR3VwMEp5RFN3dkowK2VWRFVPSm1yZlVpUFc4dEtWMWZRaWs3ME5hYTJ0bWNyS2twaFdRNlJXUWFDZkxOVEhmK0UwYW1adHNOMENUQXdjQ0NySFQxelBGSVQ2L3ZUaitSOVk2NndjVXVUbUV3WFVaZFM0aTBqcDJWS3hCQmRHcHhJOFo5aDNaTnV3NExMamgwaVRBc2p5ZGI5Ky9YNE1ER3pZY3ZMa1NZOGNJRjlmWHd5NnBOdTNiNE1NWE5hRFVMRndNcWN4eGlad3pzSGtadEd1WGZ2N2xwWVdUSzgzQU1xTnpKeGNPQUZyT2p4empmbkFIOU9uWUYrWG9lUG1DaWppNjhwY1NaVTNDS1ZmK1ZtQWxRQWtUa0pGZ2Q0T1dVME1FVUdEU2taR0J0RE0wSGdJMVJDeVNYVVp0VnF0NzltenA3aDkrM1p3VlFNRmpqckMyZFRVMUI1dWJtN25ObS9lVXExMTYxWkNkbmF1ZnVQR0RlTEVpUk8wYjczMUZocGZsUmN1WEpDZUFTaW41T1Jrb0xtZ0lWRzhtOSs1TGZVSzhDZUM5MkJuUzJSalRXVjFhcEt1cWhOcGJhMllTbXRCU2dqS3dhTkViNDFSOE83ZGU1VHYzcjBMRVFTUVkwOGtKMzJtSU5TdFEyZlBIbVNORUtwazV6NFVoQ1pkaVhNaFVCY2ZINC9RRUh3OGxSZnEzM0NnY0FQSVZsNzcvUFBQY3dGUU9YdjJiRVhNSVQ5OStveWhjZU13T2VMQUp1TGdqWUlnTERBYWpiQ3RxSG1BZjZFd1BMd2wyRmowZXIxZUdoUU9sY2NZdThJNWQ3S3pzek9CU1B6Njllc1Z3U0hVcEVtemtqTm5mcFhLdGVnREVBVGhyTkZveEhjOGJlSCtVZmlSTW43T3pzNWdNMkZnUEFkNHBuNzkra1p6alVYZVArUVJjSzlRdjNEUWtBbzNEaHdZWmRpMGFTTUVBY0FaZ0VnMkpDWW1vbElhUG16WSs5TldyZnJHOHRDaG1FSTdPenR0OCtiTjFPdlhiekRPbmoxTG1aS1NJZ21DbjUrZkxpa3BDUlZiMlJmcDFiTWpSWHU2a2NMU2drZzBFVzNhUmU5bVpFdFlEeHgwQUdOMHBMcXJOUm4wSmNxY1BLbTZpZUVmUUQ2QlZRMEMvcGZyV1lJUXJsYlRzYUprSmlCN2lERzY5ZjBZOVh5SFU4d3hLWTM2VjNPUzhVVjRTMERPQUE4YW5JeUJzYkZIZC9ickY0bDI5NHFjd3RTMWF6ZGRYTnc1bFpuV0hvamtTYmlBUXFGWUw0b2lUSTIwQ1dGaFlkbjkrdlczR3p0MkRId0I1QXdhdFdyVjZyQ25wNmZGK2ZQbmphNnUxY1ZqeDM2RXBuaU0vaVlvS0tnMFBqNGVnb0FEY2dnS0NzcU1qNDkzQkhkVGhYRkNsZmNCTnIzSXdjRmhZM0Z4c1FiWVNNeUdWaXFWcXZYcjEyc3hnVWFyMWVvTEN3c3I4ak1pWElZL0E2NmpKUURpZ2lKbzY5YXR3QTFLVEIvdDJyVWJmZlRvVVdBMGZoSUU0UStqMGFnS0NnclNmZlhWTWtYNzl1MlVaODZjNFkwYU5YclVPdS92NzQrdWNUUzRJdjB2clZvMUtDdXlHN2swYWtoME9vNW8vZ29wS2tCQlQxN3pXN1ZxTlFLSXNWOS8vVlVDcnZUbzBhTnM3OTY5TXNmMlg5YVBuaVlJUUFMbG0wd20rL1FMakNHcDRXQlBsSmxOdE9NQXAya0xwT1FObktQS0MyODhZbXY0WFBqNStZaUlpQVZ2dmpsbzdQVHAwMFFpSnQ2NWMxdCtheVUvWStyVWFmclpzMmRCZXlEc2xPbE84SmFoU3dlYnFHemZ2bjB4cU9SV3JQZ2FlZjJva1NOSHdaRmtRNGE4TGQ2NmRZc05HVElFUEF4SXgrckt5OHVOUUViRFZLQWxQQ1VsQmFFdFlIS0prWkdSaFNkUG5sVFBudjI1OGF1dnZsUWFEQVpUVWxLU2JDcmtUUUpLZVo2M3QzZXhnNE1qdTNUcG9ySmp4NDY2WmN1V2E0OGVqZVhEaGcwRGtZVUlLdC9EaHc5WERIK2hFWURaUkgrb1kyQmdJTHEvZDJSblo2TXREaDNTNFhmdTNFSDZHLzJlMEF3QXM4S3BOSUtvZk5pdzk4V3BVejk1cE5GUWkvbmpqeit3ai9MOUNSKzhSWWJaa3hnNTFlVVVHa2dVZDBuU0JJK3hvZmo2MWgzU3ZYdlhMd0hsTTdjSllHQ1k4YzZkTzJCWVFUaitwL1ZFUWRCcXRUOGFEQWFFYnZSanRNaFVTbUtOR2o3TUtBb0NOelZvSzhYTk1uSzI0b1dsRG1CeldBZEhFYk9SenVYbDVUWGN0V3NYTXhORW9JMWRrbFpnRS8zOS9UL0p5c3FLdjNmdjNxTlJmdWJXYmRRYzREaTY5TzBibWJKcjEwNDRrRWtIRGh3OENuWjFUSmc5ZXZTb0NVUWVhQmlwVzdldUxpMHREVGFkRlJVVm9VM09aRzRuZ3phQU9la3dZY0xFM2J0MjdWUU9IVG9NTTZqRTQ4ZVAwWklsUzlScGFXbFNMMlcxYXRYS3M3S3lrRFhFdlVTLzk5N1FMaHMzYmdDU1NuZm9VQXhRMjVxV0xjTkZnRkJxMTY1dFRFOVBCN09abk1iRTgwQ1FVZjBEc2t2dzl2Yk92blhyRmtKb0xKZ2FqRGRBdEFIL0NiNlZkQWFUSjA4dVdiTm1qUmJBSEhremdVSUNQVzlKU1FrY2FHQTdiSmJQcHFLZW5ZamNnb2lDQTRndVhKR0dsMVFHbXJEV3JTTTJYTDJhMERjM04xZmFaeWNuSndCZUZDYVRDUnJrc1U1b2ZOK1RCTUhDM2Qwak56MzlqdVhxMWQvcEQrMlpvRno2NlgxQm9XRGNhT0pHbFlvcDEyM2p5ZE1YU1A1QlpRY0VlUURZUlBROVlObXRYTGt5Wis3Y3VXQU9WUVlGQlpYRng4ZEx5QnF6SU1BSk9tcHRiVjIvdUxnWW9CV0VvTERoaUgvbFdjcStGaFlXam1WbFpZbGhZV0YzNTg2ZGg1SEJkUFBtVFFLeks0U2dSWXNXR0gzRFc3VnFwVnUyYkprTlNySU9EZzdnSDhSM0FSNFhqSUdpZ3dhOVZmWG16UnNnLzhDQURDVzZoTTFtU2RxTGJ0MjZsKzdmdnc5Q2daQXJyRjY5ZWpzWlkraXpWRFp2M2dMVDQ3WHIxcTB6VFpyMGtjUUI1ZXpzWEpxVGsvTUlrbTkrWnN4UlFzRm5yMEtoZ0taQ3FsZWVPQXR0QUJPSUJZZDBBcHpSdm4wank3WnUvVjU2Z3l1OFZTQWdSOVlXL2dmS3lzN0hvMW0yenNDcDQwQ2l1cjUwNy9ma2g3aUZ2MWlXdHJhMk80cUtpaUNVV0J5dCtmbjUrZmZ6OC9PQk9JUFdlclNlSkFpSXpaUEdqaDJyQ3cwTjVTTkdERmZ2WDN2UEpDaElDR3JBMkpYZk9hdmhTWHp5NTNUaHUrK2xZb3ZjSFkzd0NTbGx2QUZ5S2J2Ny92MEhvc0cyaG9kczE2NTlLVmkvVHA4K0xUdU5hT1RFaEMvOFFWSUlRRmx3QkVLZ0hwRU80WTd0N2UzWGpCZ3hzbjlzN0JITWtkU0FVeEJPM091dmQ5Q0RyMmp4NHNYc3ZmZmV4VHhKRlFBeXNKUG1zQlJDdVh6U3BNbDU2QlFhTm13b0t5MHQ0NW1aR1pVSk5YbUhEaDFLRGg4K0RGVU1CK3pkaUlpSSs2MWF0VlpNbno3TkF1d2xDeGN1RkR0MDZBQjZRU21LQUp1THM3T0w4ZEtsaTNqejVMY1pMd2VpS2Z3YllTMEtUOGduWUVIVFFDamdHS09tY2hVME9hQVBNUGRyUEhhbU5XclUwS1dtcGtLdzRPeDVaVjFtcWQ5OXoybnFQQ0lMTFdXVmxUL2tRbmlDTU9ENWtKeUQ0TUZrb2FnRkJwcUNLMWV1akRTWlRJK1FURThTQkx5WktWT21UQ241NXB0VmVRVUYrVDNDQXVtRDZOVnNhRTR1cDlmOEhwcUlHcDZNLy9neno1czZqMWJldkMzMUxJQVFFblVGRUdaSXk5M2RmZjdjdWZQR1JrVU5sTUpHRjVkcXBrbVRKcFdQR3pkVzl1VHh0dUQzVUpsREtocHFEc21veW1TUnRXMXRiYTlDRFpzbnNrcVFlclMraFlTRWlMTm5mdzVPYU42eFl3ZHAvcFMvdjcvKzJyVnJFdGV5K1ZEeXAweVprcjlueng2THBLUWtDV0VNMW5pUWErTHo0SCtFVFFabHYzbUdGVHpzaFNxVktyZFhyMTdXU1B1aWxRNjB2dHUzUnlzakkvc3F6cDgvenl3c0xFM0J3Y0dHUC81SXhzOXhTN0tBbzhzWWppN3U4MUZybVZrNGtIUkRWemdHaE8zcDA2ZlBkenQyN0tpc0RhVDlnNkJsWkdUQW5BejFjaVgvUDg2dzMvdC9pRHpPdzF5QzNpQkZWWEFvbjdaZ0ZtRVNvSDJ4dndqUFliWWZvYytlYUJxVVNtVWhHall2WExpQWhBbHVXdk5tSDlyN3hTVHFjRGVMcUVGZFJtbnBYQ3B5ZUxneG5uQ05QNGo5bWF5emMraGsvajNLNEp6NDBWTTBLekx5clpYT3psVmJZbDZ6cktLKy9ucEY4ZkRoSDhvaElNYlB3QnpJQlJ3Y0pQNVV0SHN3RlZDMVFBYmhZT0ZBU1JvbUpDUzBiTWlRSVlwKy9mb0pRNGE4RFJaWHlaRWJPblNvL3V1dkpVZ1kwcy9TMnhBVzFqZy9JZUdLUFJwSkdqUm9VSTVEeDZ3cUpISEFpZ3BCQXZ3TkFCbUR3WUQ3Z2kzZE4yWEtsUFliTm16QVJGYWxwNmVuYnZQbXpaajFVQjRkSFEwaFV0blkyT2hidEFnWFkySU95VXh4OHJOaTRBbWloc3BMUmdjSk5XclVzSzVTcFVvbTBGZC8rcEFnU0RPWTh2THk0RFIzYWhGQ3pZN3RVdnhTcDdsSXFYZVE4aVl5R0tSU09LcWhMN1dlRmpXQXptMXNjWEV4QkVFZWhtRWI5UVp0bURhT2RTOTZ3RmtWUjBiMnRrUVoyWndYbDVCSm95TFJ3b0twakVaaWVnT242UXRvVlpQV1g3eHg5T2hSeHhNblRqeHlndDU0NHcwOVNMTE4wK054b0UranNMVFdhclU3QkVGb0N3aVgyU2ZCUmtyM1hxMWFOZUFjT1RpVWdvSWFDaGp5MmFOSFQ4T1pNNmRaZG5ZMlBnZUhWcXJMdTdxNmZ1N3E2dG9qUGo3ZVZhbFUycm02VnRlYlRFWVJBZ0FLUU5EazFxOWYvL2pObXplQmpFSkdVMUpxWDMzMUZmSWdHS2dsSWFRKysyeVdQams1U2R5eVpRdXVMekdmUkVXOVdZN1JnT2JmZ1dtUWVTU1JhSU1ETGF0dk9aU1ZQaG9ZR0dpZm4xK1FlZWZPN1Q4SkFycStmSHhxR3k1ZHVvZ3BjdzJiaDlDUW85RnNqV1V0RHJ3SGFkVzB0Vnd2Q1FHY1NieE1mM3M5SzQrQU53bjJ2K0pCYVpxRjBzaWhVZlJKazJDeXg5Z2lvMGdtRzBzbU1pVW5rNUVwOUFhdVNNOGdsblNkREs3K1c5bjc3NzhQZnVWSGdsQ3ZYajJnY0V6Nzl1M0Roc2ttQWcrQlVBamdWaUNvc2FxNHVycHVRdlNDWkU1bEljQUgzbjMzM1FjalI0NVNMRmd3WDdsNTgyWXRFRDdoNGVHbTNidDM0L093dy9MWUgzbVQ4UDlUTlJxTlk0Y09IWTFIamh3R2RoTGVOQkJQVU9FUS9NZVFQWFoyZG9jbVR2eW83Y3laTTZUbzVLT1BKdWx1M0VoUkhEeDRFREcvOVBZREtOT29VU1BUL3YzN1pYTWt6NFBFM29FNUJWVlZoSmQ0UHFoeldkQlU5ZXJWeTB4TVRJVFQ5OWg1Z1BDOFRaczI0dm56NTNQeTgvTTltaldpK1RFYjJVUTdQMDZXV2lKN1IvTEt5SkQ2UldCV241Z3NlaDdwZUpZZ1BPMGFIdUdOYVZCRWMrcmhXcFVDbkIxSVlXSE5CTWFJNi9Wa2VsREN5eTdFazlpaTgzWnRqNTZSRmR2aVFiYU4rWWI2dFd2WEluMWFNYTZGTFlSdnNGMFFoRlkrUGo0TGREcWRmMjV1THJxam9jWVJsMHNPbmptZGpBbXZSWmpHc25MbENyVGRDYUN2djM3OXVoSUUxZVpleThvNTl2Y0VRVmloMFdnTUF3WU1wTldydjMyc2U5c01icW1jSDNIMDhmRkpiTmV1bmVOMzMzMm42dFdybHdGVlEvQWdWYTllSGF3alVvZ0dBUzhySzhPbzVJcEVqM0owSlB0UE1JRUFvc0pSbEpaQ29SZ21paUo4TEh4VzFpWklVeHNuVEpoZ1dMTm1EV2o1cWpZTHBXMTcxckN1emdIQWd4QmR2eVhaZkZSZjBSMkZaSllVcnYrZDlUS0NJSDhmQUp0dlR4cE9JN3EyWXpSbExqZkVYYVF2eTNTMG9FYU5HcXRHakJqWmVjS0U4WTh4WUdKR1FuQndjTjd1M2J2eEVCVTkzb1hlM3Q1OVFlSXVpc1lhYVdtMzFRYURYaHI3RXhFUllVeElTRkRrNW1ZS05UMkpkS1lhSmJtNU9ScWtmek16TTdYQStZUGExdDNkUXdSU1NxZlRnZHdMam1oRnRsR05pNHRMY25aMnRtZTFhdFYwUFh2MjVDdFhycXdzQ0hDZzVFaW00cDUyZG5kMzM5NjdkMi9oekpuZldGemNPYkMrQ1EwYU5OQm5aV1Vyc3JPekJPVCttNFlJNHFWRTRwblpqL2lVSkNCcmhRdWhLSWRJNGxFdHcreE13aWRDUmhaYVRLcWlXbHBhR3VmTm0yZWFPWE1tejh2TGE5TXhndFovdTREVjlnemhWTXVMS0NWVjhuM2dBMEhqQUhNQW4rUnZyWmNWQkd3aW9vU2hRL3BSZWQrdVJOOXRJVVBNajdTNVZFOURQdmpndy9NRkJma05vcU9qbFJXcWkyUnJhMy9JemMwMTROcTFhd2hUSzQ2b2hjQXNVU3FWd1NhVHlkYk96dGJUMDdYSTZtNjJ0Y0czbGs0SWJXQlEyRmdSZmIrWEtETkhDMWdiU3NvWWdBV0hDa3l0U0FhQi9CdnBYb1JwRlZPdkNEL1hsNWVYUjRIQnhNL1B2elEwTkFTRW1ZK3FqQlU0SWVWK2pNcWJPc2ZYMTNjQ2lrbGJ0bnh2dUhQbk5zd2FCeU10aHBmbjVHU3Jtb1dhMk03VmpNNWQ1RFJsRHBGdkxhVG15WEQ4Vndub0NvcDkySEo1WktLazNNeENnY05IcURmV3lzcnFIWFI3SWJMNTRvczVwbkhqeGlwS1NrbytHaFpGQ3laK3lBU2ZwcHk4UFlsdTNaWVNWTmcvYUQrQVhSRjJQNGtwNWFrQzhqS0NnTjlGb2dNMlNyVnJGV1UxYk1BRVZzN0xva1lUKy9VeTJhNVpzemJqczg5bU9xclZHdFAxNjM5VWJCQnRpekZBQUdScTJ3QUFId3RKUkVGVVY2NWNRU29hTnJQeXdyVnJ0R3hNMzM4NG1CcFBYMEQ4NGxIR0FJVEp5T0xVdUl1U2QrN3loaDRkUDVnVUEzOEF3emJRRTJCdURCMXNuaE5kOGJwTjY5V3I5ME5pWXFMVVV4QWNIRkxtNnVyS0RoNDg4TWhKYzNWMUxjdk16TVRtd3E0ai9Tc1ZpeW9zSE5xMXlNaEl6eU5IanR3MW1VeWVTRXJKamJuZTNwNkdtUFczTkwvR0VUVjhqV2pPTWpJTmU1TVVjSjVYYktETjUrTnBRWHJPbzhTU2ZGbjhQbndUbWFTc1YwQkF3Q2F3eTBHN2Zmenh4N3J4NDhjaE5QNWg0WFRxRmxpUHFHMGtrWmM3aVducFV1UWsrMjlJb2FQTzhiZDhoWmNSQkd3b0pCRXBWYnUzZTFPZTFvcFlRUUVaVC81S1luWUJOWmd4WTJiQ2pCbWZBcTFzMkxadHEwd3BCNGRKZXBPZUpLSWVMalNrM3h1MGVQbzRab2Q4UlVZMjZjdktTTEZzTFNrMUdtSXVIcjExRUFMd0x3RDE3T1JBck9BK2xkU3NXVXQxQTRUSUZld3ZVcmwxNnRRSk54Z01XMi9mdmkzUi91RjdRMEpDeXQzYzNOaStmZnNlNWZZUmdXQ0locm4zRWh1TUVqb1NTeFZCSFl0RFF4dDlHQmQzN3FTM2w3Wk85ZXExcXYxMkxnblhsWnpobGswZVF2bXJ1NUNoV1NpSlB0Nms3aGdoSmVIMGw2K1JZY0puNUY5V0pvV2xUM3ArUzE5ZjMxeTBEV0x3eVBEaEkwd3paODVBNDIvT2dmWE1LeVdOMDloUGlkeXEwWTI3V1ZJNFhYRUJIQU1OZ1RyUUM2MlhFWVRIdnFoUlEwci9aYS9DN1hZRzF3ZTE0V0pSS1EwUENRbFppYUZadzRhOWo5QktNQThCZ3gxODBtaGZTMWRuZXJOZkQxcll1WTJVUTJjMzBraTRtVWE4aGdjWjR5NlJJaWlBS2I3NS9yWHlrcElpUlc1T21qcWlHYkVCUFluMys0Qys4dlgxRzVhY25JUldjalR1UGdBc0lEdzgvRlpvYUtqRG9rV0xIdU11OFBQejEzdDR1R1BjN2lNZkFSMUtYMys5b21UU3BJOHNRQXB1ZmtBY0dvcEdVT3NRL2pqejMwTjZkNlhHMzh4aGsxWnM0TFJ0SDlFZk54NG1lUlpNbDV3QzhleEZVc1FuU0VJaER1cE5CdGRxcExtYVJLWGI5dEdCMCtlbHl1MlR3dWFMTld2V3JGZFNVcXFZTTJlT0RpT0M4L0p5ZWNJeGc4WGM1WnpXUjB2dEF1aGhCRS9pSzFtdlRCQnFldENGaEJNc2lCT0p0Y0s0b1VSbmZVQ3IxZllFWm4vT25Ma2xIMzg4V2M3SHcxR3FQSmFGMmRpUW80c1Q3Wmd5aXByMDdzSTBWNU00dTNTVmRKY1NTZmw2S3liVXFrSFV2RHNIckp2YjJ4R0wyVXhTU1Z5cEpCbzluV2Q4czFIQ0RBNW1qQTNBVUZBSEJ3ZlBrcEtTMHNhTm05U3JxUDZ4K1JxTjVxNkhoMGMxVzF0YkhoOGZYOUZrR1RDWE1qZzRHRDBDbUJKZkVVVU16WWRpa1RUZ0RIOHNCR3AyZEJlZERLclBsSUtTc2ZnRVR1MzZQVVFUeDI0amFoekVKRVJ4MG5YU0gvbUpxd1NCS0tBZTZlN2ZKODNLRGZUVHpYVDY5dDQ5aWNxNDhwclV0R25UbWFkUG4xWXZXN2E4Yk9IQ0JUejlUcHEyT0lVcFcvWGlCR2RVcDVlNEp2NTNrTVZMaXNNckV3U05pbzUrT29IYTJ0a1FMVnBCcHN4OGk1dGxaV1cxcTFXclptelZxcFYrMjdadEVBVGtZRkdIcVB3bUxMeDRoTWI2MVdHS3pHek9KODRrM1pWa1VxOWRSSXF3SUFXVjZ6aWRqZWVVZEFQWkcwWnY5NE9UK0JBZjhkNEVmaVAyWitwbE1GQ2FtNXZicWJWcjEvbUdoSVJJQ2FlMWE5ZVZUcHc0dmpMa2JGei8vZ1BmMjdGanU2Kzd1NGNoTmZYaDhFL2srOUZYWURBWVJuYnMySEV4VUVJbWswbk16OCt2R1ByQ1JDQ2RDOUFOdUlrUVlYalU5Nlc1QnpleEFUYldDQVVmYW9YQ0J5Z1Jjd3J3WitUcXd1aG1HcWNOTzdpdVJSaXBmTHlaSWllWERIZXp1R0xBY0JvdWlsSkZzcUxUckFnTEM3dVJuNS92RG5oZTc5Njk5VHQzYk5LOEgwWDh2VGVab29vajhWbExPQzFiSzVYdC8xUkovRHN5OGFvRXdhcER1OWZ5TzdUbWlqNGRmbGRsWm5OZDMyR2t2bmxiNnZpVllGNW0ybjJVcHhIcVNLdHBFRVhZMmxIMDZnWGtxRll6Mm5lRXN5KytJdnB5RnZIMjRReHBWSmFleWFtZUw5SGhFMlRjdXBjU0hoUlRkcm1PaWtVam1US3k2ZnU4KzFJYkdNTEdNOHVYTHcrNGV6ZGRzV2pSWWlFM040Y1ZGeGZMUlNmNUt6RmQvYnRtelpxZkI1K3p2NzgvYUdja1p4RmpkTUxDd3ZRblQ1NUVqZUJzWUdEZ0Z5VWxKZUtOR3plVW9paEtEbUdGRFlaR2tQa01rZlZqenM1U1RHOHRpQ1J3SWh1bXBLYWRXdE5IRTRlVEc5THdjSFNENmpOKytqeG5XM1lUdlIxSlluRXBLUnJXSmRQbTNXVDhkREhWTEMyVmFnRHk2c3NZMjRab3k4cEtFSU5mTXlyZUgwUzhkeGNGNnpHRTgrM3IzOVFIUmZ4MDZQcjFOR2lwSnc3a2VGNmhlQldDNE5RMDFPYnNpWDJoOXJyaUU0NkZSY1NxT0pMK3dRT3V2RmZFbEFPR2M5VE1zVkJXaHEyRk5sRDE2a3luM2gxQXdjMUNtREIxSHFkZnp4UHRXOGNJRUt6RVpFNzJka1JjSkw1d0ZTV2ZPVWVmWEUrVEVrM0FGZnlWWGZYMTlmVzdDSTZBcEtSckZSdHQ1SDNBd1FGc01wY3hkcUpLbFNwTmMzTnpoYUNnSUVOOGZMeE1mbVdDOXJweDR3YmllQ0NqZ2pVYXpXeWRUZ2MwRkFhTkdlN2Z2NitTNTBpWUx5eVZ0NSt5MlNvUEQvS3Q3VVdmalJwQzNRTDhTWG5yRGxIUWE0elFGakI4Q2xGa054TEhEV09LelR0NStacXR0TzcwQlFuTGdZUEYyY3lwNFVHVFR1MWhWTlhwSVZnVmE5Qkl6dHVHTThvc2lpdy85dU8ybEovT1NNMjNMeklzL1UrMy9MS0NvUFQxb2RNengydENOKzdRaVE0T1JDdStZTXF0ZTdtK1V3UlR1RlJsUW5ZdTV6NU4rVGE5UVdvTDB6VnFTTzkzanFDUGhnOWgzaXMzY01ySUlwbytqbkdEZ2JPVVZDa3NvcmlMWk55OGh3NGsvRUd6MHRJSWlhRW5jZi9BcTRkdkVLdFdxNCtZaDRSSWtIY0FZczFQQ3hZUk5NbWlwTzNldnYzclY0OGQrOUVhWHI2WmNrWnlGaGxqOTYyc3JHeUJVczdLeWdLU0I4aG9SQmhvWmV0clkyT2pybEhEVzUrYWVndmppeVJ1QnJOUWdnWVhoNGQ3Uk1aUURnTXJicmJDMFpHcSs5V2tkMTV2UlNNanU1RlRSamFSZjIxR0FKbzI3YzVweEdDaVhwMFpqMC9nOTBkTm84RXB0eVFnck1QOGFaUTE1bDJGT3VXV1NPbVpSQWRpaVhwMElyNXNEVkZPZ2FOaHhlY0Zxc0IyRW0waG5NZS92VjVXRUR5REEraldsdVdNSmFWd2ZWWXVxWk5UaUowL1Q3cVFVRkxPKzRSeFlzUW16ZWE1aVVrVTI3SXAxZW5UbFVLMjdTRlY0R3VNYW5weUVsU01zcklmTnRQK2NKektkdXluZWFmamFWMTV1V1Q3bmxpTVVpcVZCODJoNENtRlFqRlFFQVJmdlY1L0NWeU45dmIyaHF5c3JFYWNjN3l4aUNBa1FiSzJ0cjVTcDA2ZFdpQ3pRRjBCZU1INCtIZzVtc0NRc1U3SVRtSnd0MW5BNUZtWXdGM0NRL2RXcVZUV3JWdEhwQXFDTWlBbUpnYStDTUpMUkVMenpEV0tpaWlydnpvWXUrRDYxTGx0QzVyL2RuOXl5OHFXcXJmazZrdzBZaXFuQnY1RW5kb3kvZVZFbm1OdFJUWitQc3l1dWd1anNaK0tZc3N3RW5mdEoySGFSRVJSakMzNWx2TjMrak5qU0NkK0ppTkx3bkw4N2ZWU2doRGVtQ0k3dGFhdG5kb3k4blRqeG5NWG1jcmRsZWpqVDduKytBVVNNaTh4cGxhaFJZN0R5NVdrMzJRaTlsczhKNWVxUkhuNVJKN3VSTC9GazJGRE5IMTE4Z3d0TmNmWXozcWdqbDVlWGp2VDB0SlFWZnl4ZXZYcVJ6TXlNbEFmOEZjb0ZGdEZVUVQ2QnUxbzZDZVFhKzVMQncxNmErang0OGRaZXJyRUh2OTdXRmlZeDltelorVnkrRko3ZS90aER4NDh3QkFSMFdnMHlpU2U4cjNnK3FnaUlwWGJxVnUzN2lmMjc5K0hRMGRDYksxYXJkSHA5VHFvZEFCU25zWXZJVi9QSnJRQjllN1NqdWIxNjA1VmMvSUFUR1drVVFPaS92aXhtRXljSXQvbjNOK0grTGxMcE9qY2x2alZaSTI0YXA1ZU9Yc3BOeGJjSitYWDY2VXM0NS9ZYlo2MWtmTFBYMVlRSm4wOGt1YnNpU0Y2cDc5Z3NMSi9qU1VtWEJLaTk1Q3BTT2NvZnZSaGdkQ3lNZnpvLzEwNlBaZDhBQUJoMHpQSXRISTliVGx3akw3UTZRaE8xM010SHgrZnRNTENRdGZjM0Z5WW15MWFyWGFMMFdqc2FUUWFnZFlCcUFZMkU2b1NsVk9tVUNqR2pSOC9ZWFpNekNHNmZ2MjZHcW9kcXI5NTgrYXp6VVBHOEwxckxTd3NhcFdWbFlVRGltNmVUSWVzS1pwZDRkRlhOU2Vxa0I1K3dCajdrWE1Pc3dCS3Uwd3JLNnNINEVZMkN3bysrN3pMdmxrb3ZUdndEWm9hM3BqczRGU2kyMXl0K3QramliL0N4VG5MRld6RXNIYkdqRHV4UXMrdURZeHZqK044OCtMTHdwaFBPV3ZUbkZqZllWSUVJY01GbnZlN0gzM3VwUVNoWTJ2NmRzZHE5dDd3ajdrNDl4TldubkI3bU5DbWhhc3AvLzREL3NHb2RhbzdkL0xaanRWTTZlck1HTnE3cjkrU1dxTklGRW44ZGpQOXRDNmFQaTRya3hJMUw3UWNIUjNQZW5oNE5MaDgrVExjVU9Ub3ZlM3Q3V1B1MzcrUE54SzU5Zy9OMExjbURnNE9nMGFQSGoxNDBhSkZLamMzZDFOU2tvUmFnaDN2MHE1ZHV6M3lYR3QwVkF1QzhMR2pvK09lbkp3Y0xRQW90MjlMYUd2azhERWREVDBjV05BTXlJWEFTUVFTR1JqRXBqNCtQc2RTVWxLZ2FSQmVTcjBZTDdqYzN1aEVNNFpHMGFCcVZVbnRYcDJSclRXandpSk8zUVp6NDV1OVNValBEZEMvMGJPdEtTOHZSMW1Rc1ZtQmZFVzdsa3k1YlM4WHgzOG1zYlk4czluMVNmZjBVb0lRMHBCNjcxdkRvdThYRXR0M2hPdVNiNUJnYTJ0Smx4S040cmw0dlFKbzI5SHZNRVZ3QU9Ed25HN2Q0WHhYRFAyK2NoTjltcGxKdTUrV1puN0dKZ2JQbVRQM0ozT1M2Z3R6N3lIZVJ0RGJBK3VZcDFLcE9uYnQybTNlMUtsVExjTERXN0N1WGJ0S3dGT3oxNC9mU2UzVHArK1hPM1pFeTVsRkNFZERHeHVibjR1TGl4MGdzQUMvM3J0M0Q4S0Ftc2hxTSs0UUJTMllFL2dQMERndE1mRldxOVZXTVkvaUJjd09pS0svdFd3c3FObDdnMmpldUdHc3FiUFR3eGRvNzJIT2Zid1orMlF1a2trYW81K1BUbG5mRHhSeVJLOUhFSDI3aVV4cnRrbkQzdjkyR1BsU2d1RGpTWDI3ZEtEdk83ZlJzTHU1TlF4eGNja3FoZUJBdDlNTnBuMUhpcFhmemljYUhQblFOTnkreThXaEgvRlZ4MytSOEFjVmt5Y3Z1bUdDczdQTGVqOC8zeDZYTDEvV0F2Q2lVcWx5YXRXcWRjdmUzc0ZVdFdvVkoyOXZiN2Rtelpwcm5KeWMrSmRmZnFsd2NYRTJybHUzVHE0elNHQ1ZwazJiZmxtMWF0WHUrL2J0azRaeW04TzFOUXFGNGx4d2NQRFN1TGc0U1VDMFdxMU9FQVJVL3dDVWhmTUtRWUFQZ25BTlNHZDM4eUJTcFNBSThDMDJtdjJHSjdLY1BzY0RxL3AzcDQyVFI3QytIdTZrT1BFTHA2YWhqSUJWblBwUm05SXpaMU0xRTRaNzh0bkxxbEIxdXgxczEwRml4MDlMeU8vSEtQT2U0M3Rlaldsb0gwNHpoZzJpNlErS1ZXSzdMdk5LTFRRbHF1VHJkMWw2eXJmcVFhTkVIbFNmQ3JxMHBSc0dJNG5iRDFKMDRqVXBHL2U4azVYbEpFN2wrTmpYMXRiMlVubDVlZWJnd1crN25qeDVncUdHQWZpNnI2K3ZDUHA3RE9ETXpNd1VVMUpTaEY2OWV2RTllL1lLOSs0VnlPRWtLblNiUm8wYW5mamJiMmRxblR0M1RtTm5aMmQ4OE9BQmtsNUlJL3ZiMjlzbk96bzYyUUwyanAwQ1FLUng0eWJsYXJWS0RYaGRSa2FHQXMwMUlLK3lzYkhod0R0eXpwTURBZ0pxNXVmbll5UWljQlpaRlE0Q0FvT0VFOHJpVHgzTlcrRjNGQTYyMU1ITG5RS0xTcWpteFZqMlRwdStuSElMQkhIUkY1MU50dFlDTFYyK1gyZ2VZaUNWbWt3VFp6MmE4ZlFpNS85cUJNSGJuUnAxYWtNbjNWeEpXMVR1YTlSb0ZLeUtjejFEeHlhN0xCcDM0YUtWQlYxTnV5dTF5Yi9JUWpJSE5oNklaaHdlTW9kb081YzNGai9IZndONTFGR3BWSGJyM2J1M3ljdkxpNmVtcHZGejU4NmlmMEtvVXFVS2o0cUtNcXhkdXhhRW5MSVFnTDBFa0h1L2Z2MzZ4VjI5ZWhXa2xWcDNkM2VUWHEvbkdHRmt4Z2I4T0hYcXRIMExGc3dId0VYT0Z5d1hCTUhUeThzcndNL1B6OG5lM2w2d3NMQVU4L0p5Yy9mdTNZdDdSTlZ6cVZLcFREV1pURUFMeVI0OElodWdqd0FpZ1JDZ1RBeEtvZWVlU2RpbERZMytaajViaWxiRHBCc2E4WWZkNytvMHlsVEY3QVduVkY5OTlrRGgzNElQTFMyWFROZmZYaTlsR3ZDdDlmMW8zS29GTlBmcnpjSDZrQUNUVnNXdUtON3R6NWwvT0JlWmd0SnZwa2t3NnVkZFdrRVE0SnpWTlJxTkNNRlFXTUdHUWpEUWp3Z2dDNGc0VUxsRGJ5V1NMc0Fld0hIRFlaYzdPRGg0UkVTMHFSWWNIQ1JPbXpaTndpT2F2eHhJSHVBWDd6VnExT2lBVHFmdm1KT1RiUUwwRFVqaHNMQXdmdVRJRVFnQzdINU5qVWF6YWZIaXhTMUhqeDZObVV6eU5WRFp4S0Vpd3NGQndzUkJZMkVmb2VuUThJTTZCTzRKelRrSU45RzJqL3ZGNTVGZVIvY1l1cHZocHp6WGl1cEZpejhaeGNZT0djZnB6QVZwUHpxNE9GR0h3ZjNwalovT1VOeHZGeVJBeS85cFpsRitFQnlRbUovSXJvTmlUK1NjR3JibFlra1ozYjZUSVczKzg2N1BHR05UT09jNFZMUzd3ZW5DSnU4UkJBRlRUeEdxSVhzM0d6eUZhRzBEV05YT3prN3Y2bHBkM2J4NWN4Qlcwdno1OHhTSmlZa1ZLNGNvRnNsRUh1NkxGeTlPSEQ5K3ZBMUdBdnordXpUTmpuLzc3V3JEMEtIdnlaVkloSWhoRmhZVzEzdjM3bTIvYTljdWEwRGdLL2dTZUo2S3piYjROOUxmZ0o5QjY4QUU0SzFIdVIxdnFveWJCQTREUWdRemdWWjZsTFNmdVlZT3BGMURvOWdiSDA3aGRPNmlKS2pQNnVaKzVqVXJmK0NsTlVLRkM2cW1qU0dkSUJBRGtkUCtJMlFvTGFQeitmZWt0dmpuWFNDa1FqaUl0d3NwWG9SbmVBUHFWNjFhOWJmYzNGeXdtV011UkxHN3U1dGFvOUVhZHU3Y29jRm80TlRVVkxDMVl0aFlaYjRadVdFR0tXWld1M2FkQzVhV2x2VXZYNzRrMUs5Zlg1K1FrQ0FkL29ZTkcvVWpSZ3pIZERrSnNtN3V5bDZLNlNzYk5teDBIanQyakJxRTI1NmVudExnYnpQcVdRcUgvNkoxRVBlTSs4QzFjT2dJNjZEZFFHMHNjMElpZlFuQmZ1WWFPWVRpb3Q2Z2tNNkRKTmhiUmFMelovN3U4MzdnVlFvQ1dWblFzWTNMV01TUFAzUGFGVU5Hblk3bUZ6NlFOdUM1VnBVcVZVN201ZVhCaHVQTlFuSUlzeDNLbFVybEZyVmEzY1ZrTW5HRHdmQlhSYVVuWFI5dktiSi9TQUZqN1IwL2ZzTHJHQVdBdzJ2WXNLSGg0c1dMVXRHcFc3ZHV4cWlvTjQxOSsvYVJvV3NJeFdEV01wUks1WWtOR3pZMnpNaklVR01HSm1aT3RXblR4Z0I2UURUSEZCVGtzek5uZmxPY092V3oxSUlIdG5RTStVYlRxYm1yQ0JOeVVTVkVEZ0x3TjVnMGVQaHlWdk9wKy9QSktNb0pDcUNxdmFBTEh5S1ZrYjE4cGV1VkNnSWdhRDlzcHJ6Z0FDYTBqZVRHSzlla0RCKzZwSjUzUVkzaWpmbWdaY3VXWTMvNjZTZW93UnBhcmRZSlRsc0ZBQ3dtb3BlRHFqWWhJZUd2MkUvd21rSzdnRzRQdmdINGtTL09talhiNDlOUHA4UG1TeER6ME5CUXpGV1NOQUs2bzA2Y09HSDQ3TE5aUERiMmlDd00wQ1lJRlJ1cDFlcTJJU0VoeTcyOHZOUTZuVjV4OE9BQmpWNnZSOVlTMEhxUWFZaGp4b3d4TGxteUJDTjNGYURxdjN6NWtnekdRVFFDVXdXL0IyQVNDQU9FOUZuTUxiZzF6ZEtaVkZaYVJtekt3MjZQcHlHOG5uZWYvL1M1VnkwSVpHZEY3ZDdxUnovc2pLSDFHWm1TUFgrUmRWS3BWRFkzbVV6ZjkrN2QyOFBhMnJySit2WHJIM0VwWU1vTDZoWnF0UnFobXdnMWZmMzY5Y3JBRXpoMHlQL0RGamNhT25UbzJvTUhEeXE4dkx5MFo4K2V0WkxMeUl5eG13MGJOdlF3bDZFaE9FVU5HemFrenAwN2E1WXZYNDYzdVNLMERhb2V5S1FCR28xbXBxV2w1UkNqMFNUVXJ1MkRpU3owODg4L3l6a0tYcjI2bStqdTdtWkFXUG9YSmdQRUlmQVRVQ0NDZ0QwMlQvb0pHOVgydTRWMGVOVm1VbHk2U2lhMWhpNlVsRWhhN3BXdVZ5NElPSVFSYjlPWDIvZFRhVzcrRTF1Mi8vSWhuSnljcnBwWlY0MXF0ZnFMOFBEd3NTNHVMb3FDZ25zc1B6K1BRSWdoejRBeVE4NHdkaEJ2R3BJOHlGUkNveUJtdi9ueHh4K2ZpWXM3YjNubHltVVYydVhsRXJYNWl3OEhCd2RiMzdwMXEwbEJRWUhTMXRaV1gxUlVCSWV5VjkrK2tUSDUrWGtjSS9iMGVuMUZZWUNwUU5ZUUNDdkEzY2NnT3RCb05JSy9mMTBUWmtoczJyUVJFOWNVYU16RjNBVVBEMCtXbW5xTHBhU2t3UHpBZ2NUTUpmZysyUGZudGZYaEgzMUlKNC85UWp3bmoweWxwYlF2Lzc0VVdyL1M5WjhRQkZXMXFoUlZWRUpYU2tzZkVXRSsxMDNiMk5pYzBtcTFvV1p5QitRS1ZsbFpXVG1Jb3RqWVlEQUVtOE00Nlo2dHJhMTF4Y1hGVU9zUzE3R01ORzdUcGszV2dBRURXVVpHaHYyTUdaOUtUbDJsTDBkZlFhUE9uVHZISFRwMENJa2ZxSGVUdWQwdFRLMVdlM1R0MnZWN1FOMlhMMTlldVcwZXBnTGFBMkFWZkM5c05Xei9mSTFHdytyVThUVmk2T25Ka3lkQSs2ZUF1UUc5Z01GZ3dLRWovNEhHR1RtYVFYVHhKenJBdjlpbzJqR2JLZm53Q2VJakJoT3YwMExTSmlBUGU2WHJQeUVJTDNPRFRWOTdyZjZoa3BKaXE5VFVWRGhlMkhTOHFkZzg2VkNRNWNNSUlQT1g0T2VBY0FPOVZFMnIxYzVzM2JwMXZ3WU5BdFVMRnN6WFZCQUNEb1N5S0lvZzVFUk0zODNiMjN2WjdkdTNJU2lZeWlxYS9RODB6SUk5TmNESHgrZGJSMGZIaHNnZ0ppVWxQZGFwaFJLMm1Xd0x6VDB3R3pnWVJFY2NSSnBWcXpvYjBWeUxFVDN5WkpaS213S3pBT3JnNTJsUlk4MUQ2Wk9RQmpUdGJoWWQybkZRdXI5WHZ2NXBnb0FIZkNzME5IUkpzMmJOMUhmdjNtVmxaZVZLeGtnc0tTbGgxNjRsb2JWTXhoRGlzMGdYSTE2UGpJenNONTh4Y2psMzdwd3lQVDBkTEdLU1E2aFVLbEZTUnFjVnVwS1IwTEd3c0xENFhhL1hZOUljK2hoa2R2anluSndjSkdWUU9ZUTJndkJ0SGo5K2ZNK2xTNWVDWDA5aEZpWTVQSVVRd2hHR2lVQUZGYVAxWk5wKzlEUGk1M0JsSkVJTjg4bkJRWVFKUTBMcFJicVg4ZnRnT1FIRzRubFQ5QzhrTFA5RVFjQUQxS3RTcGNwSVoyZm41Z2FEd2FXd3NOQW1KeWZuc1VaYU0rb0lwZGNlbzBlUCtmTDQ4V09XQ1FrSmNpb1pvZGxsYytzY25oRjhUNkNlTVZsWldhMTNkM2Z2bjV5Y3JIWjBkQ3dyS0NpUWlrdVlSUVVxNFBMeWN0RHBZbm9LRnRRNU1BOVk4OFBEdzBzREF4c0tXcTFHY2Z6NGNZcVBqeGRFVVVSMkVjSUFMa1dncW1TK3BJb0hBZDhGUEFZUW5PZlJBaTkwaUsvaXcvOVVRWkNmelQ0d01QRDg5ZXZYMGFNQTlReUhEVzhWc0FGb0swOFpNV0xFNVppWUdMdWJOMjlDQ0FETVFKQUZtM3hCRUlRUEJFRVlVVjVlam01aHBId0hqeG8xZXNtR0RldHRDZ3NMU3h3Y0hPNFVGaGJXUlNUQkdQdWhXYk5tclgvNTVSY0lITWd0Wk5ZWDRBdVF5WU4vOElsU3FleGdaV1hsNCtOVHUyNlBIdDJGNmRPblEzUEFQQ0RORFRPR3RETHlEK0Fza01ORG9KUHgvMTRxRGZ3cUR2eEoxL2luQzBKSVZOU2JQMi9ldkVrdUZRTTdpSmxUWUNQamdpRHM2dE9uYjVldFc3L0g0ZUZ0Nitqdjd6KzVaczFhblE0ZE9najFpL0U2U09LQXZiMzVrQ0ZETmxoYlcyTUdrcTBvaWhOdGJXMkhlWGg0MUFSREdqcUo3ZTN0SjJnMEdtMTJkamIyQmZVQzhCN2hiemgxeUhJaUxBWGhPRGdVNnZicDArZGJVZVRWZHUzYUNTR3QzRGlMZVJXb3Rzck9ZV1UreFAva3ViN3d0Zi9KZ2dEK2dIZmMzVDFHcGFmZmtWUE9ZRU45OUZhOS9ucUhtOWV1L2U1MSs3YlU5SXpjZmNHb1VhT3VSa2RISjJkbFpVRURJS3kwVUNxVlBkdTNiNy9pd3crSGd3VGNxcWlvQ001YWxFYWpPZHkxYTFmbHpwMDdjVmlvSU82dVU4ZDNKUnAyT2VmUVBqQUxnTHpKeUdUa0FIQk5ZQ3B3THhIdDJyV1BPWG8wRm40R3RFSEZuQWFFRTBBWk9KTFFHS2liQUVQNXdvaXNGejdWdi9FTC8yUkJ3QnNFR0Jnd2lLallvUWdGQmxKVS82UzFhTkdTZ3FsVHA5aVZsWlhoYmNTbU40Mktldk80dTdzYmZmUE5LbE5SVVdHNktJcU96Wm8xdHdDL3dwZGZMclUyTTVlMXQ3Q3dHS3pWYXZzTUhEaVFWcTFhaGVrcEVMWjNsVXBsbjhEQWhoRVhMa2ljUnRnZlhCdjJIOElBalFBVGdQNE1hQnRtWTJOelU2VlN1Wm1KT1JBZVNoQm9zNGxBL3lVWTBhQ2QwTm9HaWYxSG1vZC9zaURJNXcxYnV3TmdJU0xDREVVQVNxVVZIYjJqdUgvL2ZoWW1rd205Qi9EYUxUQldiK0RBZ2M2dXJ0VlpZdUpWdm4zN2RyQ1R5OFVvUE8vYVdyVnEyZlR2UDZCYlltSWk2OW16QnpxcWhlam9hS2gzSFBZSENvWGlFeHNibStxVktIYmxyOFZoUWx2SmszRzNSVVJFZERsKy9EaTBCZklaR0UyQWhXcm5URE4yRW9Md3R4SEdmK01GZitGZitUY0l3aE1mYXZueUZmbGp4b3l5TnhxTjRCQ1M0K3NBalViems0ZUhoOVd0Vzdla3NNOThBUndFaEdobHUzYnRkd0xBOHNVWGN4UjkrdlJoZS9iczRiTm56d0loRjZxUGlBSlFJL25KeTh2TCt1N2R1ekllUWQ0cjRBakFUQ0s5MlZxdGRsTkVSRVRmbUpnWWhJdmdRZnJUMU53WFBwWC9nMS80Vnd2Q2dBRURVazZlUE9tZGtaR0JjQkdEdFExS3BYSzFsWlZWZjVQSnBDMHBLWkZMeW5qVHdYa1k2K2ZuRjV1UmtkbW1aY3VXK3NHRDMrTFhybDB6V1ZwYTBxUkpreXdYTEZob0dETm1OT3c5VEFGQ1FvQmt3RUdBZmNLMTRLVGllK0JBU3NPNDdlenNUbU9jVUhGeE1VeUF6S2o2ZjNDVUwvZVYvMnBCUUcwaE1yTGZtOUhSMitIY29mL2dJR1BzRDg0NWlDeUJNb1l0UjZnSkZTMGxjSUtEUXk1ZXVIQStjUERnd2VYNStma0tjN2VTeE5OVXYzNkE0ZXJWQkNTZmtENldDYlZRR0lJUXdFVEI4VU1MSGxyaUVCRllPRGs1RlpnN3B2RTVPSkwveXZWdkZ3UlZSRVNiQkkxRzdmbkREejhBTXdqeUxQQUlJZitQdjZYc292bGtRSVd6M2NYRkpTNDdPOXRuNXN5WmhsbXpaZ0VCVFRLcHRvV0ZCVmhjRGFkT25jS0lQS0NLY09nVndhYkFTcURnZzZnQldxYXRVcWs4WWpLWmtHdDRMcERKUDFWSy91MkNJSm5wNE9DUWJXcTFxdE9aTTJkUUtrWVdFWFpheHZoRDFjTS9TTFMydHE3Q09iY3RLU241WnNtU0plOHNYTGpJMHNuSjBYamx5aFc1eXJqUHc4T2o0NTA3ZCtCWFFLTmdEQThTUkFDUUlBS291R1N5YnhTdWdKOThrWlR4UDA0ZS9qOElBamJWdG03ZHVudWNuWjJiWExwMDZVRmhZU0dtdW9Ea0c2MW4rSU1jZzVWQ29VRFVrUytLNG9acTFhb3Q2dEtseTd1QXZSODZkQWdSQ1RRSE1JYW9LQ0pzUllFS2phMXdDa0hBaVk1akhEYUVCSWdqMUMyUWNVUnpMRUF3LytyMS8wVVFjQWhxbFVxRmlLRnhhV2xwYlZFVThaYmpBSkhqbDluakt4Nldxbi8vL2tmVmFrM2pEUnNrOEFzK2k0b2dWa1dUZ244anM0ZzJOK1EyNEM4Z1pZeUVFcEpRbFRYRnYxSWcvajhKd2dzZmdJdUx5N0xXclZ1L3YyM2JOaUNId0xYd3RDWlNhQUk1eVlRczRuK2tDdmpDRC9HS2Z1Ry9XaEM2ZE9teTlkU3BVMzBMQ3d1QlBJSXArSzlkLzlXQ0VCd2N2RG8rUHY0ZHpqbDZMeEFkQU9qNlg3bitxd1VCVTJzWlk0Zk1CU2FrcVpGditLOWMvd1BJN292b3VLVzBZZ0FBQUFCSlJVNUVya0pnZ2c9PVwiIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2VkdS5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBpZD1cXFwiZWR1XFxcIj48ZGl2IGlkPVxcXCJlZHUtdGVhY2hlclxcXCI+PC9kaXY+PGRpdiBpZD1cXFwiZWR1X2NhcmRcXFwiPjxzcGFuPmVkdS5jYXJkPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XFxcInRnbV9fX0hUQkx1VkFfV2llbl9YWF8xMjAwX1dpZVxcXCI+PHNwYW4+dGdtIC0gSFRCTHVWQSBWaWVubmEgWFg8YnIvPjEyMDAgVmllbm5hLCBXZXhzdHJhw59lIDE5LTIzPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XFxcImZ1bGxOYW1lQ29udGFpbmVyXFxcIj48ZGl2IGlkPVxcXCJsb2FkaW5nU3Bpbm5lclxcXCI+PC9kaXY+PGRpdiBpZD1cXFwibW92ZUZ1bGxOYW1lXFxcIj48ZGl2IGlkPVxcXCJNYXhpbWlsaWFuX01haXJpbmdlclxcXCI+PHNwYW4+VW5rbm93bjwvc3Bhbj48L2Rpdj48ZGl2IGlkPVxcXCJGdWxsbmFtZU92ZXJsYXlcXFwiPjxkaXYgaWQ9XFxcIkZ1bGxuYW1lT3ZlcmxheUdyYWRpZW50XFxcIj48L2Rpdj48ZGl2IGlkPVxcXCJGdWxsbmFtZU92ZXJsYXlTb2xpZFxcXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGltZy11c2VyPjwvaW1nLXVzZXI+PGRpdiBpZD1cXFwiVXNlcm5hbWVfX21tYWlyaW5nZXJcXFwiPjxzcGFuPlVzZXJuYW1lOiA8L3NwYW4+PC9kaXY+PGRpdiBpZD1cXFwiR2VidXJ0c2RhdHVtX18yOV8yXzIwMDBcXFwiPjxzcGFuPkVtcGxveWVlOiA/PC9zcGFuPjwvZGl2PjxkaXYgaWQ9XFxcIkdfbHRpZ19iaXNfXzI5XzA4XzIwMzBcXFwiPjxzcGFuPkx1Y2t5IGRheTogPzwvc3Bhbj48L2Rpdj48ZGl2IGlkPVxcXCJXb2hub3J0X1xcXCI+PHNwYW4+QXV0aGVudGljYXRpb246PC9zcGFuPjwvZGl2PjxkaXYgaWQ9XFxcIklEMjQyNF9XaWVuXFxcIj48c3Bhbj4gPC9zcGFuPjwvZGl2PjxpbWctYXVzdHJpYT48L2ltZy1hdXN0cmlhPjxkaXYgaWQ9XFxcInN0cmlwZVxcXCI+PGRpdiBjbGFzcz1cXFwiZWR1LWNvbnRhaW5lci1zaWRlXFxcIj48c3BhbiBjbGFzcz1cXFwiZWR1LWNhcmQtc2lkZSBhXFxcIj5lZHUuY2FyZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiZWR1LWNhcmQtc2lkZSBiXFxcIj5lZHUuY2FyZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiZWR1LWNhcmQtc2lkZSBhXFxcIj5lZHUuY2FyZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiZWR1LWNhcmQtc2lkZSBiXFxcIj5lZHUuY2FyZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiZWR1LWNhcmQtc2lkZSBhXFxcIj5lZHUuY2FyZDwvc3Bhbj48L2Rpdj48L2Rpdj48L2Rpdj5cIjsiLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiXG5pbXBvcnQgKiBhcyByYW5kb21EYXRlIGZyb20gXCJyYW5kb20tZGF0ZS1nZW5lcmF0b3JcIlxuXG5cblxuZnVuY3Rpb24gcHJpdHR5RGF0ZShkYXRlOiBEYXRlID0gcmFuZG9tRGF0ZS5nZXRSYW5kb21EYXRlKCkgYXMgRGF0ZSwgeWVhciA9IGZhbHNlKXtcbiAgdmFyIHNldCA9IGRhdGVcbiAgdmFyIGdldERhdGUgPSBzZXQuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gIGlmIChnZXREYXRlLmxlbmd0aCA9PSAxKXsgLy9leGFtcGxlIGlmIDEgY2hhbmdlIHRvIDAxXG4gICBnZXREYXRlID0gXCIwXCIgKyBnZXREYXRlO1xuICB9XG4gIHZhciBnZXRNb250aCA9IChzZXQuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpO1xuICBpZiAoZ2V0TW9udGgubGVuZ3RoID09IDEpe1xuICAgZ2V0TW9udGggPSBcIjBcIiArIGdldE1vbnRoO1xuICB9XG4gIHZhciBkYXRlTm93ID0gZ2V0RGF0ZSArIFwiLlwiICsgZ2V0TW9udGggKyAoeWVhciA/IFwiLlwiICsgc2V0LmdldEZ1bGxZZWFyKCkgOiBcIlwiKTtcbiAgcmV0dXJuIGRhdGVOb3cgYXMgc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZHUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgcHJpdmF0ZSBtYWluRWR1Q29udGFpbmVyID0gdGhpcy5xKFwiI2VkdVwiKVxuICBwcml2YXRlIGVkdVRlYWNoZXIgPSB0aGlzLnEoXCIjZWR1LXRlYWNoZXJcIilcbiAgcHJpdmF0ZSB1c2VybmFtZUVsZW1lbnQgPSB0aGlzLnEoXCIjVXNlcm5hbWVfX21tYWlyaW5nZXIgc3BhblwiKVxuICBwcml2YXRlIHBhc3Njb2RlRWxlbSA9IHRoaXMucShcIiNJRDI0MjRfV2llbiBzcGFuXCIpXG4gIHByaXZhdGUgZnVsbE5hbWVFbGVtID0gdGhpcy5xKFwiI01heGltaWxpYW5fTWFpcmluZ2VyIHNwYW5cIilcbiAgcHJpdmF0ZSBsdWNreURheUVsZW0gPSB0aGlzLnEoXCIjR19sdGlnX2Jpc19fMjlfMDhfMjAzMCBzcGFuXCIpXG4gIHByaXZhdGUgdmFsaWRVbnRpbEVsZW0gPSB0aGlzLnEoXCIjR2VidXJ0c2RhdHVtX18yOV8yXzIwMDAgc3BhblwiKVxuICBwcml2YXRlIGZ1bGxOYW1lT3ZlcmxheSA9IHRoaXMucShcIiNGdWxsbmFtZU92ZXJsYXlcIilcbiAgcHJpdmF0ZSBtb3ZlRnVsbE5hbWUgPSB0aGlzLnEoXCIjbW92ZUZ1bGxOYW1lXCIpXG4gIHByaXZhdGUgc3Bpbm5lciA9IHRoaXMucShcIiNsb2FkaW5nU3Bpbm5lclwiKVxuICBjb25zdHJ1Y3RvcihleHBlY3RlZFVzZXI/OiBcInRlYWNoZXJcIiB8IFwic3R1ZGVudFwiKSB7XG4gICAgc3VwZXIoZmFsc2UpO1xuICAgIFxuXG4gICAgaWYgKGV4cGVjdGVkVXNlciA9PT0gXCJ0ZWFjaGVyXCIpIHRoaXMuZXhwZWN0VGVhY2hlcigpXG4gICAgZWxzZSBpZiAoZXhwZWN0ZWRVc2VyID09PSBcInN0dWRlbnRcIikgdGhpcy5leHBlY3RTdHVkZW50KClcbiAgfVxuXG4gIHVzZXJuYW1lKHRvOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVzZXJuYW1lRWxlbWVudC50ZXh0KFwiVXNlcm5hbWU6IFwiICsgdG8pXG4gIH1cbiAgdXBkYXRlUGFzc2NvZGUobGVuZ3RoOiBudW1iZXIgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDE1KSkge1xuICAgIGxldCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoKE1hdGgucG93KDEwLCAoKGxlbmd0aCAhPT0gMCA/IDMgOiAwKSArIChsZW5ndGggKiAwLjcpKSA+PSAxNyA/IDE3IDogKChsZW5ndGggIT09IDAgPyAzIDogMCkgKyAobGVuZ3RoICogMC43KSkpKSkpXG4gICAgdGhpcy5wYXNzY29kZUVsZW0udGV4dChudW0gPT09IDAgPyBcIlwiIDogbnVtKVxuICB9XG4gIGZ1bGxOYW1lKHRvOiBzdHJpbmcpIHtcbiAgICBpZiAodG8gPT09IFwiXCIpIHtcbiAgICAgIHRoaXMuZnVsbE5hbWVFbGVtLnRleHQoXCJVbmtub3duXCIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5mdWxsTmFtZUVsZW0udGV4dCh0bylcbiAgICB9XG4gICAgXG4gIH1cbiAgbHVja3lEYXkoKSB7XG4gICAgdGhpcy5sdWNreURheUVsZW0udGV4dChcIkx1Y2t5IGRheTogXCIgKyBwcml0dHlEYXRlKCkpXG4gIH1cbiAgY2xlYXJMdWNreURheSgpIHtcbiAgICB0aGlzLmx1Y2t5RGF5RWxlbS50ZXh0KFwiTHVja3kgZGF5OiA/XCIpXG4gIH1cbiAgZW1wbG95ZWVUeXBlKHRvOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbGlkVW50aWxFbGVtLnRleHQoXCJFbXBsb3llZTogXCIgKyB0bylcbiAgfVxuXG4gIGF1dGhlbnRpY2F0aW9uKCkge1xuICAgIHRoaXMuZnVsbE5hbWVFbGVtLnRleHQoXCJBdXRoZW50aWNhdGluZy4uLlwiKVxuICAgIHRoaXMuZnVsbE5hbWVPdmVybGF5LmNzcyhcIm9wYWNpdHlcIiwgMSlcbiAgICB0aGlzLm1haW5FZHVDb250YWluZXIuYWRkQ2xhc3MoXCJiaWdcIilcblxuICAgIHRoaXMuZnVsbE5hbWVPdmVybGF5LmFuaW0oW1xuICAgICAge3RyYW5zbGF0ZVg6IDAsIG9mZnNldDogMH0sXG4gICAgICB7dHJhbnNsYXRlWDogMTAsIG9mZnNldDogLjl9LFxuICAgICAge3RyYW5zbGF0ZVg6IDB9XG4gICAgXSwge2R1cmF0aW9uOiA5MDAsIGVhc2luZzogXCJsaW5lYXJcIiwgaXRlcmF0aW9uczogSW5maW5pdHl9KVxuICAgIFxuXG4gICAgdGhpcy5zcGlubmVyLmFuaW0oW1xuICAgICAge29wYWNpdHk6IDAsIG9mZnNldDogMH0sXG4gICAgICB7b3BhY2l0eTogMCwgb2Zmc2V0OiAuOH0sXG4gICAgICB7b3BhY2l0eTogMX1cbiAgICBdLCAxMDAwKVxuICAgIHRoaXMuc3Bpbm5lci5hbmltKFtcbiAgICAgIHtyb3RhdGVaOiAwLCBvZmZzZXQ6IDB9LFxuICAgICAge3JvdGF0ZVo6IDM2MH1cbiAgICBdLCB7ZHVyYXRpb246IDEwMDAsIGl0ZXJhdGlvbnM6IEluZmluaXR5LCBlYXNpbmc6IFwibGluZWFyXCJ9KVxuXG5cbiAgICB0aGlzLm1vdmVGdWxsTmFtZS5hbmltKFtcbiAgICAgIHt0cmFuc2xhdGVYOiAwLCBvZmZzZXQ6IDB9LFxuICAgICAge3RyYW5zbGF0ZVg6IDAsIG9mZnNldDogLjV9LFxuICAgICAge3RyYW5zbGF0ZVg6IDE1fVxuICAgIF0sIDEwMDApXG5cbiAgfVxuXG4gIGRvbmVBdXRoZW50aWNhdGlvbigpIHtcbiAgICB0aGlzLm1haW5FZHVDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJiaWdcIilcbiAgICB0aGlzLmZ1bGxOYW1lT3ZlcmxheS5jc3MoXCJvcGFjaXR5XCIsIDApXG4gICAgdGhpcy5mdWxsTmFtZU92ZXJsYXkuYW5pbSh7dHJhbnNsYXRlWDogMH0pXG4gICAgdGhpcy5tb3ZlRnVsbE5hbWUuYW5pbSh7dHJhbnNsYXRlWDogMH0sIDMwMClcbiAgICB0aGlzLnNwaW5uZXIuYW5pbSh7b3BhY2l0eTogMH0pLnRoZW4oKCkgPT4gdGhpcy5zcGlubmVyLmFuaW0oe3JvdGF0ZVo6IDB9KSlcbiAgfVxuXG4gIGFzeW5jIGV4cGVjdFN0dWRlbnQoKSB7XG4gICAgbGV0IGMgPSB0aGlzLmZ1bGxOYW1lT3ZlcmxheS5jaGlsZHMoKVxuICAgIGMuZmlyc3QuY3NzKFwiYmFja2dyb3VuZFwiLCBcImxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSg4MywgODAsIDc0LCAwKSwgcmdiYSgyMzYsIDE2OCwgNTYsIDEpKVwiKVxuICAgIGNbMV0uY3NzKFwiYmFja2dyb3VuZFwiLCBcInJnYigyMzYsIDE2OCwgNTYpXCIpXG4gICAgYXdhaXQgdGhpcy5lZHVUZWFjaGVyLmFuaW0oe29wYWNpdHk6IDB9KVxuICB9XG4gIGFzeW5jIGV4cGVjdFRlYWNoZXIoKSB7XG4gICAgbGV0IGMgPSB0aGlzLmZ1bGxOYW1lT3ZlcmxheS5jaGlsZHMoKVxuICAgIGMuZmlyc3QuY3NzKFwiYmFja2dyb3VuZFwiLCBcImxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSg3NywgMTkxLCAyMzgsIDApLCByZ2JhKDc3LCAxOTEsIDIzOCwgMSkpXCIpXG4gICAgY1sxXS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwicmdiKDc3LCAxOTEsIDIzOClcIilcbiAgICBhd2FpdCB0aGlzLmVkdVRlYWNoZXIuYW5pbSh7b3BhY2l0eTogMX0pXG4gICAgXG4gIH1cblxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL2VkdS5jc3NcIikudG9TdHJpbmcoKVxuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vZWR1LnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYy1lZHUnLCBFZHUpOyIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhodGJHNXpPbmhzYVc1clBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1TDNoc2FXNXJJaUIzYVdSMGFEMGlNVGM1TGpJM05TSWdhR1ZwWjJoMFBTSXlORGt1TkRRNElpQjJhV1YzUW05NFBTSXdJREFnTVRjNUxqSTNOU0F5TkRrdU5EUTRJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0pzYVc1bFlYSXRaM0poWkdsbGJuUWlJSGd4UFNJd0xqRXlOU0lnZURJOUlqQXVPRFl6SWlCNU1qMGlNUzR3TVRraUlHZHlZV1JwWlc1MFZXNXBkSE05SW05aWFtVmpkRUp2ZFc1a2FXNW5RbTk0SWo0TkNpQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlNQ0lnYzNSdmNDMWpiMnh2Y2owaUkyTTBZemRqWVNJdlBnMEtJQ0FnSUNBZ1BITjBiM0FnYjJabWMyVjBQU0l4SWlCemRHOXdMV052Ykc5eVBTSWpZV0ZpTUdJMUlpOCtEUW9nSUNBZ1BDOXNhVzVsWVhKSGNtRmthV1Z1ZEQ0TkNpQWdQQzlrWldaelBnMEtJQ0E4WnlCcFpEMGlkVzVyYm05M2JrRjJZWFJoY2tSbGNIUm9JaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNndE1qUXhMamM1TmlBdE16RXpLU0krRFFvZ0lDQWdQSEpsWTNRZ2FXUTlJbUpoWTJ0bmNtOTFibVFpSUhkcFpIUm9QU0l4TnpraUlHaGxhV2RvZEQwaU1qUTRJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNneU5ESWdNekV6S1NJZ1ptbHNiRDBpZFhKc0tDTnNhVzVsWVhJdFozSmhaR2xsYm5RcElpOCtEUW9nSUNBZ1BHY2dhV1E5SW5WdWEyNXZkMjVCZG1GMFlYSWlQZzBLSUNBZ0lDQWdQR2NnYVdROUltRjJZWFJoY2lJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9MVEUxT0NBdE1Ta2lQZzBLSUNBZ0lDQWdJQ0E4WnlCcFpEMGlZbTlrZVNJK0RRb2dJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk5DSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lEUWlJR1E5SWswdExqVTBNU3d4TGpRMU1VTXhMak13T0MweExqazJNeXcxT1N3d0xEVTVMREJzTGpFeE5pdzRPQzR6T0ROSUxUWXhMakpXTkRVdU56RnpOREF1TkMweE15NHhPRE1zTkRZdU5qRTJMVEUyTGpjNE1XTXhMall4TnkweUxqazBOQ3czTGpnek1pMDRMalV3TlN3eE1pNDBNVEl0TVRBdU5EWTRReTR4TVRRc01UY3VNVFV6TFRJdU16a3NOQzQ0TmpVdExqVTBNU3d4TGpRMU1Wb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RRMk1TQTBOelVwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnYVdROUlsQmhkR2hmTlNJZ1pHRjBZUzF1WVcxbFBTSlFZWFJvSURVaUlHUTlJazB0TGpFNU5Td3hMalExTVVNdE1pNHdORFF0TVM0NU5qTXROVGt1TnpNeExEQXROVGt1TnpNeExEQldPRGd1TkRRNFNEWXdMakEzZGkwME1TNDVjeTAwTUMweE5DNHdNaTAwTmk0eU1UZ3RNVGN1TmpFNFF6RXlMakl6Tml3eU5TNDVPRFVzTmk0d01pd3lNQzQwTWpRc01TNDBOREVzTVRndU5EWXhMUzQ0TkRrc01UY3VNVFV6TERFdU5qVTBMRFF1T0RZMUxTNHhPVFVzTVM0ME5URmFJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnMU1Ua2dORGMxS1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBOEwyYytEUW9nSUNBZ0lDQWdJRHhuSUdsa1BTSm9aV0ZrSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3RNU2tpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSlFZWFJvWHpFaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBeElpQmtQU0pOTkRndU16VXpMRE11TURNell6STVMamMyT0MwdU16STNMRFUxTGpRME1Td3lNaTQzTXpFc05EWXVOellzTmpZdU5EWTNjeTB4TkM0Mk9USXNOamN1TmpVekxUUTJMamMyTERZM0xqWTFNMU14TXk0ek16TXNNVEUzTGpnek5Dd3dMRFk1TGpVc01UZ3VOVGcyTERNdU16WXNORGd1TXpVekxETXVNRE16V2lJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9ORFF5SURNMU5Ta2lJR1pwYkd3OUlpTm1OMlk1Wm1FaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHlJaUJrWVhSaExXNWhiV1U5SWxCaGRHZ2dNaUlnWkQwaVRUVXVORGN4TERVdU1EZ3pZekV1TnpjNUxEQXNOQzR4Tnpjc015NDJOaklzTlM0eE16RXNPQzQwT0RZc01TNHpOVFVzTlM0d05UWXRMakkzTERFd0xqYzBMUzR6T0RJc01UVXRMakkwTWl3NUxqSXdPUzB1TVRJMkxERXlMak0zTkMwMkxqTTVMRGN1TnpjNWN5MDNMamN3TmkwdU9EZ3pMVGN1TnpBMkxURXpMalU0TmxNeUxqRTFPQ3cxTGpBNE15dzFMalEzTVN3MUxqQTRNMW9pSUhSeVlXNXpabTl5YlQwaWJXRjBjbWw0S0RBdU9UVXhMQ0F3TGpNd09Td2dMVEF1TXpBNUxDQXdMamsxTVN3Z05UTTBMak15TXl3Z05ESXdMakk1TlNraUlHWnBiR3c5SWlObU4yWTVabUVpTHo0TkNpQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4MU5pSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lEVTJJaUJrUFNKTk9DNDNNamtzTXpNdU1UUmpNUzQzTnprc01DdzBMakUzTnkwekxqWTJNaXcxTGpFek1TMDRMalE0Tml3eExqTTFOUzAxTGpBMU5pMHVNamN0TVRBdU56UXRMak00TWkweE5TMHVNalF5TFRrdU1qQTVMUzR4TWpZdE1USXVNemMwTFRZdU16a3ROeTQzTnpsVExTNDJNVGdzTWk0M05UUXRMall4T0N3eE5TNDBOVFlzTlM0ME1UVXNNek11TVRRc09DNDNNamtzTXpNdU1UUmFJaUIwY21GdWMyWnZjbTA5SW0xaGRISnBlQ2d0TUM0NU5Dd2dNQzR6TkRJc0lDMHdMak0wTWl3Z0xUQXVPVFFzSURRMk1TNHdORGNzSURRMU5TNHhOQ2tpSUdacGJHdzlJaU5tTjJZNVptRWlMejROQ2lBZ0lDQWdJQ0FnSUNBOFp5QnBaRDBpYUdGcGNpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTVRVNElERXBJajROQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSlFZWFJvWHpZaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBMklpQmtQU0pOTkM0eE1qa3NNUzQzTnpkak5TNHhMVFV1TnpVc01UVXVNekEzTFM0MExERTFMak13TnkwdU5GTTRMalV1T1RZM0xEVXVOalk0TERNdU16RTJXaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb01qazFMakV3TVNBek5qWXVOalUzS1NCeWIzUmhkR1VvTFRRMUtTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZOeUlnWkdGMFlTMXVZVzFsUFNKUVlYUm9JRGNpSUdROUlrMHpMakExT1M0M09EVmpNeTR3TVRndE5TNHdNVElzTWpndU16QTJMalU0Tnl3eU9DNHpNRFl1TlRnM1V6RXdMamN4TVMweExqSXNOUzQyTmpnc01TNHhOVEphSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3pNRFV1TVRnMklETTFOaTQxTVNrZ2NtOTBZWFJsS0MwNEtTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZPQ0lnWkdGMFlTMXVZVzFsUFNKUVlYUm9JRGdpSUdROUlrMHRNUzR5TVRNdU5HRXhOaTR5TXpnc01UWXVNak00TERBc01Dd3dMREUyTGpVeUxERXVOVFF5VXpRdU5UTXpMREl1TVRNeUxERXVOVE01TERCYUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d5T1RjdU9UWTVJRE0yTmk0eE56Y3BJSEp2ZEdGMFpTZ3hOVEFwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4NUlpQmtZWFJoTFc1aGJXVTlJbEJoZEdnZ09TSWdaRDBpVFMweExqSXhNeTQwTjBNM0xqVTVNeXc1TGpVME5Td3hOeTQ1TmpFc01TNHhMREUzTGprMk1Td3hMakZUTlM0Mk5EY3NNeTQzTkRjc01TNDFNemtzTUZvaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLREk1TXk0ek1UWWdNemN3TGpJek5Ta2djbTkwWVhSbEtERXlPU2tpSUdacGJHdzlJaU5tTjJZNVptRWlMejROQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSlFZWFJvWHpFd0lpQmtZWFJoTFc1aGJXVTlJbEJoZEdnZ01UQWlJR1E5SWswdE1TNHhOVEVzTVM0d016SkRNaTQ0TVRjc09DNDRNVElzTWpVdU56TXpMUzQ0TkRNc01qVXVOek16TFM0NE5ETlROaTQxTWprc01pNDVMREl1TkRJdExqZzFXaUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTFRBdU16VTRMQ0F3TGprek5Dd2dMVEF1T1RNMExDQXRNQzR6TlRnc0lESTRPQzQwTVRJc0lETTNPQzR5T1RJcElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHhNU0lnWkdGMFlTMXVZVzFsUFNKUVlYUm9JREV4SWlCa1BTSk5NVEF1TlRVMUxURXVNMk16TGprMk9DdzNMamM0TERFMUxqRXpMUzR5TkRRc01UVXVNVE10TGpJME5ITXRPUzQwTERNdU5ETXhMVEV6TGpVd05TMHVNekUyV2lJZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb0xUQXVNekkyTENBd0xqazBOaXdnTFRBdU9UUTJMQ0F0TUM0ek1qWXNJREk0T0M0d01qa3NJRE00T0M0d09UTXBJaUJtYVd4c1BTSWpaamRtT1daaElpOCtEUW9nSUNBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVVHRjBhRjh5TVNJZ1pHRjBZUzF1WVcxbFBTSlFZWFJvSURJeElpQmtQU0pOTlRNdU1qRTVMVFV1TXpReVl6Y3VOREkyTERBc01UZ3VOREkxTERNdU1EYzBMREkxTGpNeU1pdzJMalEwTlVNNE9TNDBOVGtzTmk0ME16Z3NPVE11TnpJekxERTBMamszTVN3NU5pNHlMREU1TGpBNU5HTTBMakEyTVN3M0xqa3NOUzQzT0Rjc01UVXVOemM0TERVdU5UWXhMRE13TGpFdExqRXNOQzQxTnpFdExqYzNNaXd4TXk0eE1qRXRNUzQ1TlRNc01UTXVNamN6UXpnMkxqUXlOeXcyTkM0eUxEVXhMakExT1N3ek1pNHpNemtzTXpZdU5ETTVMRE15TGpNek9XTXRNVGt1T0RVMkxEQXRNelF1TXpnM0xERTFMakkxT1Mwek5DNDVOelF0TlM0MVF6RXVNalVzTVRrdU1qRTFMRGN1TmpVeExERXlMakF4Tml3eE5TNDJPREVzTmk0eU1qWmpOUzQyT0RVdE5DNHhMRE11TkRnMkxUY3VNVGt4TERrdU9USTRMVGt1TWpjM1F6TXpMak14TlMwMUxqVTBPQ3cwTmk0eU1qa3ROUzR6TkRJc05UTXVNakU1TFRVdU16UXlXaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb01qYzVJRE0yTVNraUlHWnBiR3c5SWlObU4yWTVabUVpTHo0TkNpQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pRWVhSb1h6SXlJaUJrWVhSaExXNWhiV1U5SWxCaGRHZ2dNaklpSUdROUlrMDVMakV4TkMweE1DNHlNVGxzT0M0eE5EY3NNaTQwTlRKVE5DNHdPVFV0TGpjM05DMHhMakV6TVMwdU1URXhZeTB4TGpjeE55NHlNVGd0TkM0MUxqUXdOeTB6TGpZdE15NDNNVk01TGpFeE5DMHhNQzR5TVRrc09TNHhNVFF0TVRBdU1qRTVXaUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTUM0M09EZ3NJQzB3TGpZeE5pd2dNQzQyTVRZc0lEQXVOemc0TENBeU9EWXVOek16TENBek9ETXVNakkwS1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk1qTWlJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXlNeUlnWkQwaVRUa3VNVEUwTFRFd0xqSXhPVk15TUM0M09ERXROQzQzTXpJc01qRXVNelkyTFRRdU1EVnpNeTQxT1RNc015NDNMRGN1T1RjeExEZ3VOamczUXpJM0xqWXlMRFF1T0RVMUxUTXVNVEl5TFRRdU56ZzJMVE11TlRNNUxUUXVPUzQxTmpndE1UQXVNeXc1TGpFeE5DMHhNQzR5TVRrc09TNHhNVFF0TVRBdU1qRTVXaUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTUM0M09EZ3NJQzB3TGpZeE5pd2dNQzQyTVRZc0lEQXVOemc0TENBek1EUXVOek16TENBek56QXVNakkwS1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk1qUWlJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXlOQ0lnWkQwaVRURTJMakEwTlMweE1DNDVNRFp6T0M0ek56RXVNVEUyTERrdU9ETTBMREV1TVRNM0xERXVPVEV5TERRdU1qSTJMRFl1TWprc09TNHlNVEpETXpBdU5EVXlMUzR6TkMwM0xqZzJOeTAxTGpneU5DMDRMakk0TkMwMUxqa3pOeTAwTGpFM055MHhNUzR6TXpjc01UWXVNRFExTFRFd0xqa3dOaXd4Tmk0d05EVXRNVEF1T1RBMldpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTWpreExqUXhPQ0EwTVRJdU9EYzRLU0J5YjNSaGRHVW9MVGt5S1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk1qVWlJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXlOU0lnWkQwaVRUQXNNaTQzTVRsRE5DNHdOaTB6TGpVeU1Td3hOaTQyTlN3ekxqZzFMREUyTGpZMUxETXVPRFZUTlM0NE5qWXVNVFl5TERFdU5qWXlMRE11TVRZNFdpSWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29NQzQ0TnpVc0lEQXVORGcxTENBdE1DNDBPRFVzSURBdU9EYzFMQ0F6TmpJdU1qSTFMQ0F6TmpZdU5EQXpLU0lnWm1sc2JEMGlJMlkzWmpsbVlTSXZQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnYVdROUlsQmhkR2hmTWpZaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBeU5pSWdaRDBpVFRBc015NHpPV016TGprMk9DMDNMamM0TERFMExqZ3dPUzR5TmpZc01UUXVPREE1TGpJMk5sTTFMamN6TXk0eUxERXVOakkwTERNdU9UUTVXaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb016VTRMakU1TkNBek5qSXVNVEUyS1NCeWIzUmhkR1VvTWpVcElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHlPQ0lnWkdGMFlTMXVZVzFsUFNKUVlYUm9JREk0SWlCa1BTSk5NQ3d6TGpBeE9VTTBMakl5TnkwMUxqQTNMREUxTGpZeU1pdzBMakV6T0N3eE5TNDJNaklzTkM0eE16aFROUzQzTXpNdU1UZ3NNUzQyTWpRc015NDFNVGRhSWlCMGNtRnVjMlp2Y20wOUltMWhkSEpwZUNnd0xqazROU3dnTUM0eE56UXNJQzB3TGpFM05Dd2dNQzQ1T0RVc0lETTFNaTR4TWpFc0lETTFPUzQ0TURRcElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHlPU0lnWkdGMFlTMXVZVzFsUFNKUVlYUm9JREk1SWlCa1BTSk5NQ3d6TGpNNVl6TXVPVFk0TFRjdU56Z3NNVFV1TkRReUxqZ3hOeXd4TlM0ME5ESXVPREUzUVRFNUxqUXhPQ3d4T1M0ME1UZ3NNQ3d3TERBc05pNHdOak1zT0M0Mk9Gb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RNMU5TNDJNemdnTXpZd0xqZzJPU2tnY205MFlYUmxLREU0S1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk16QWlJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXpNQ0lnWkQwaVRUQXNNeTR6T1dNekxqazJPQzAzTGpjNExERTBMamd3T1M0eU5qWXNNVFF1T0RBNUxqSTJObE0xTGpjek15NHlMREV1TmpJMExETXVPVFE1V2lJZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb01DNDVPVFlzSURBdU1EZzNMQ0F0TUM0d09EY3NJREF1T1RrMkxDQXpORGN1T0RZMkxDQXpOVGd1TkRJeUtTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZNekVpSUdSaGRHRXRibUZ0WlQwaVVHRjBhQ0F6TVNJZ1pEMGlUVEFzTXk0ek9XTXpMamsyT0MwM0xqYzRMREUwTGpnd09TNHlOallzTVRRdU9EQTVMakkyTmxNMUxqY3pNeTR5TERFdU5qSTBMRE11T1RRNVdpSWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29NQzQ1T1RZc0lEQXVNRGczTENBdE1DNHdPRGNzSURBdU9UazJMQ0F6TkRVdU9EWTJMQ0F6TlRjdU5ESXlLU0lnWm1sc2JEMGlJMlkzWmpsbVlTSXZQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnYVdROUlsQmhkR2hmTXpJaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBek1pSWdaRDBpVFRBc05DNDJORFJETVM0ek1qa3VOekV4TERNdU5USTVMamcyTnl3MkxqQTBOQzQ1TlRsaE55NDRORFlzTnk0NE5EWXNNQ3d3TERFc01pNHdNelV1TXprelF6RXhMall4T0N3eUxqTTRNU3d4Tmk0d05EVXNOaTR5TERFMkxqQTBOU3cyTGpKVE5TNDNNek10TGpFMk5pd3hMall5TkN3MUxqUTRPRm9pSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtETTJOaTQxTnpjZ016Y3dMamczS1NCeWIzUmhkR1VvTWpncElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHpNeUlnWkdGMFlTMXVZVzFsUFNKUVlYUm9JRE16SWlCa1BTSk5NQ3cyTGpnd09VTXpMak0wTkMwekxqYzFMREk1TGpFc05DNDFOamtzTWprdU1TdzBMalUyT1ZNeU1DNDJNek1zTkM0d016Y3NNeTR4TWpJc09DNHdOemRhSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3pNelF1TlRVMklETTFNaTR5TVRNcElISnZkR0YwWlNnNUtTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZNelFpSUdSaGRHRXRibUZ0WlQwaVVHRjBhQ0F6TkNJZ1pEMGlUVEV3TGpVMU5TMHhMak5qTXk0NU5qZ3NOeTQzT0N3eE5DNDRNRGt0TGpJMk5pd3hOQzQ0TURrdExqSTJObE14Tmk0eU9EZ3NNUzQ0T1N3eE1pNHhOemt0TVM0NE5UZGFJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNneU9URXVNVFV5SURNMk9TNDFOREVwSUhKdmRHRjBaU2d4TWpBcElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGOHpOU0lnWkdGMFlTMXVZVzFsUFNKUVlYUm9JRE0xSWlCa1BTSk5NVEF1TlRVMUxURXVNMk16TGprMk9DdzNMamM0TERFMExqZ3dPUzB1TWpZMkxERTBMamd3T1MwdU1qWTJVekUyTGpJNE9Dd3hMamc1TERFeUxqRTNPUzB4TGpnMU4xb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RJNE9DNDBNelFnTXprMExqZzVOU2tnY205MFlYUmxLREV3TnlraUlHWnBiR3c5SWlObU4yWTVabUVpTHo0TkNpQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pRWVhSb1h6TTJJaUJrWVhSaExXNWhiV1U5SWxCaGRHZ2dNellpSUdROUlrMHhNQzQxTlRVdE1TNHpZek11T1RZNExEY3VOemdzTVRRdU9EQTVMUzR5TmpZc01UUXVPREE1TFM0eU5qWlRNVFl1TWpnNExERXVPRGtzTVRJdU1UYzVMVEV1T0RVM1dpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTWpnNUxqUXpOQ0F6T1RndU9EazFLU0J5YjNSaGRHVW9NVEEzS1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk16Y2lJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXpOeUlnWkQwaVRUQXNNeTR6T1VNeExqTXlPUzQzT0RRc015NDFNamt1T0RnM0xEWXVNRFEwTGprME9Dd3hNQzR4TVRRc01TNHdNeklzTVRZdU5pdzBMalF5TERFMkxqWXNOQzQwTWxNMUxqY3pNeTR5TERFdU5qSTBMRE11T1RRNVdpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTXpjMExqQXdOU0F6TnprdU1qSTFLU0J5YjNSaGRHVW9OVEFwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4ek9DSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lETTRJaUJrUFNKTk1Dd3pMak01UXpFdU16STVMamM0TkN3ekxqVXlPUzQ0T0Rjc05pNHdORFF1T1RRNFl6UXVNRGN1TURnMExERXdMall4Tml3ekxqUTBOaXd4TUM0Mk1UWXNNeTQwTkRaVE5TNDNNek11TWl3eExqWXlOQ3d6TGprME9Wb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RNM09DNDVOemNnTXpnM0xqY3lNeWtnY205MFlYUmxLRFkxS1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk16a2lJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQXpPU0lnWkQwaVRTMHlMakkxT0N3MkxqUTRNVU10TGpJNU15NDNNalVzTVRBdU9USTRMREl1TURJMUxERTBMalkwTlN3eUxqRTFPVUU0T1M0M05ERXNPRGt1TnpReExEQXNNQ3d4TERJMkxqazRNU3d6TGpVMk5pd3hNak11TlRBNExERXlNeTQxTURnc01Dd3dMREVzTVRNdU1qUTRMRFV1TkRFeFF6Z3VPVE0wTERVdU55dzBMamswTVN3MExqRTBNeXd5TGpRc055NDJXaUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTUM0d01UY3NJREVzSUMweExDQXdMakF4Tnl3Z016Z3pMakV5TWl3Z016a3lMamc0TXlraUlHWnBiR3c5SWlObU4yWTVabUVpTHo0TkNpQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pRWVhSb1h6UXdJaUJrWVhSaExXNWhiV1U5SWxCaGRHZ2dOREFpSUdROUlrMHdMRE11TXpsRE1TNHpNamt1TnpnMExETXVOVEk1TGpnNE55dzJMakEwTkM0NU5EaGhNVGd1T0RFMExERTRMamd4TkN3d0xEQXNNU3czTGpnNE1pd3lMakk0TmxNMUxqY3pNeTR5TERFdU5qSTBMRE11T1RRNVdpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTXpjNUxqa3lOeUEwTURBdU5qWTVLU0J5YjNSaGRHVW9OeklwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4ME1TSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lEUXhJaUJrUFNKTk1Dd3pMak01UXpFdU1EVXpMREl1TmpRMUxETXVOVEUxTGpVM05DdzJMakF5T1M0Mk16VXNPQzQyTmpNdU5Td3hNeTQ1TERNdU1qUXlMREV6TGprc015NHlOREpUTlM0M016TXVNaXd4TGpZeU5Dd3pMamswT1ZvaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLRE0zT1M0eU5EZ2dNemsxTGpZNU5pa2djbTkwWVhSbEtEWTNLU0lnWm1sc2JEMGlJMlkzWmpsbVlTSXZQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnYVdROUlsQmhkR2hmTkRJaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBME1pSWdaRDBpVFRBc015NHpPVU14TGpNeU9TNDNPRFFzTXk0MU1qa3VPRGczTERZdU1EUTBMamswT0dNMExqQTNMakE0TkN3NExqYzJOU3d5TGpjd09DdzRMamMyTlN3eUxqY3dPRk0xTGpjek15NHlMREV1TmpJMExETXVPVFE1V2lJZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb01DNHpOelVzSURBdU9USTNMQ0F0TUM0NU1qY3NJREF1TXpjMUxDQXpOemt1TXpnekxDQXpPVEV1TmpnMktTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZORE1pSUdSaGRHRXRibUZ0WlQwaVVHRjBhQ0EwTXlJZ1pEMGlUVEFzTXk0ek9VTXhMak15T1M0M09EUXNNeTQxTWprdU9EZzNMRFl1TURRMExqazBPR00wTGpBM0xqQTROQ3c0TGpZME1Td3lMalUwTERndU5qUXhMREl1TlRSVE5TNDNNek11TWl3eExqWXlOQ3d6TGprME9Wb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RNM09DNDNPVEVnTkRBMkxqWTNLU0J5YjNSaGRHVW9OekVwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4ME5DSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lEUTBJaUJrUFNKTk1Dd3pMak01UXpFdU16STVMamM0TkN3ekxqVXlPUzQ0T0Rjc05pNHdORFF1T1RRNFl6UXVNRGN1TURnMExEZ3VOelkxTERJdU56QTRMRGd1TnpZMUxESXVOekE0VXpVdU56TXpMaklzTVM0Mk1qUXNNeTQ1TkRsYUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d6TnpndU9USTNJRFF3TkM0Mk5qa3BJSEp2ZEdGMFpTZzNNaWtpSUdacGJHdzlJaU5tTjJZNVptRWlMejROQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSlFZWFJvWHpRMUlpQmtZWFJoTFc1aGJXVTlJbEJoZEdnZ05EVWlJR1E5SWswd0xEUXVOalEwUXpFdU16STVMamN4TVN3ekxqVXlPUzQ0Tmpjc05pNHdORFF1T1RVNUxERXdMakV4TkN3eExqQTROU3d4Tml3MkxqQTBPU3d4Tml3MkxqQTBPVk0xTGpjek15MHVNVFkyTERFdU5qSTBMRFV1TkRnNFdpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTXpZNUxqQXlPU0F6TnpRdU5UTTBLU0J5YjNSaGRHVW9NeklwSWlCbWFXeHNQU0lqWmpkbU9XWmhJaTgrRFFvZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlVR0YwYUY4ME5pSWdaR0YwWVMxdVlXMWxQU0pRWVhSb0lEUTJJaUJrUFNKTk1DdzBMalkwTkVNeExqTXlPUzQzTVRFc015NDFNamt1T0RZM0xEWXVNRFEwTGprMU9XTTBMakEzTGpFeU5pdzRMamMyTlN3MExqQTROeXc0TGpjMk5TdzBMakE0TjFNMUxqY3pNeTB1TVRZMkxERXVOakkwTERVdU5EZzRXaUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTUM0M05UVXNJREF1TmpVMkxDQXRNQzQyTlRZc0lEQXVOelUxTENBek5qY3VNVEkxTENBek5qY3VPRGs1S1NJZ1ptbHNiRDBpSTJZM1pqbG1ZU0l2UGcwS0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ2FXUTlJbEJoZEdoZk5EZ2lJR1JoZEdFdGJtRnRaVDBpVUdGMGFDQTBPQ0lnWkQwaVRUQXNNeTR6T1VNekxqazJPQzAwTGpNNUxERTJMakV5Tml3MUxqRXdOeXd4Tmk0eE1qWXNOUzR4TURkVE5TNDNNek11TWl3eExqWXlOQ3d6TGprME9Wb2lJSFJ5WVc1elptOXliVDBpYldGMGNtbDRLREF1T1RZMkxDQXdMakkxT1N3Z0xUQXVNalU1TENBd0xqazJOaXdnTXpVNExqUXlPU3dnTXpZMUxqSXhNU2tpSUdacGJHdzlJaU5tTjJZNVptRWlMejROQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSlFZWFJvWHpRNUlpQmtZWFJoTFc1aGJXVTlJbEJoZEdnZ05Ea2lJR1E5SWswd0xETXVNemxETVM0ek1qa3VOemcwTERNdU5USTVMamc0Tnl3MkxqQTBOQzQ1TkRoak5DNHdOeTR3T0RRc09DNDNOalVzTWk0M01EZ3NPQzQzTmpVc01pNDNNRGhUTlM0M016TXVNaXd4TGpZeU5Dd3pMamswT1ZvaUlIUnlZVzV6Wm05eWJUMGliV0YwY21sNEtEQXVOVGc0TENBd0xqZ3dPU3dnTFRBdU9EQTVMQ0F3TGpVNE9Dd2dNemN6TGpVeE55d2dNemMzTGpBME1Ta2lJR1pwYkd3OUlpTm1OMlk1Wm1FaUx6NE5DaUFnSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKUVlYUm9YelV3SWlCa1lYUmhMVzVoYldVOUlsQmhkR2dnTlRBaUlHUTlJazB3TERNdU16bERNUzR6TWprdU56ZzBMRE11TlRJNUxqZzROeXcyTGpBME5DNDVORGhqTkM0d055NHdPRFFzT0M0M05qVXNNaTQzTURnc09DNDNOalVzTWk0M01EaFROUzQzTXpNdU1pd3hMall5TkN3ekxqazBPVm9pSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtETTNPUzQ0TnpjZ016ZzJMamN6TVNrZ2NtOTBZWFJsS0RjNUtTSWdabWxzYkQwaUkyWTNaamxtWVNJdlBnMEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWxCaGRHaGZOVEVpSUdSaGRHRXRibUZ0WlQwaVVHRjBhQ0ExTVNJZ1pEMGlUVEFzTXk0ek9VTXhMak15T1M0M09EUXNNeTQzTXpjdU5UZzVMRFl1TWpVeUxqWTFZelF1TURjdU1EZzBMRGd1TlRVM0xETXVNREEyTERndU5UVTNMRE11TURBMlV6VXVOek16TGpJc01TNDJNalFzTXk0NU5EbGFJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnek9ERXVORFkwSURReE1DNHhNRFFwSUhKdmRHRjBaU2c1TVNraUlHWnBiR3c5SWlObU4yWTVabUVpTHo0TkNpQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pRWVhSb1h6VXlJaUJrWVhSaExXNWhiV1U5SWxCaGRHZ2dOVElpSUdROUlrMHdMRFl1T0RBNVl6TXVOalEzTFRndU5qTXNNall1TWpreExUSXVOekU1TERJMkxqTXRMamMyTVZNeE1TNHdNVGd0TGpReE9Td3pMakV5TWl3NExqQTNOMW9pSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtETXpOeTQxTlRZZ016VXpMakl4TXlrZ2NtOTBZWFJsS0RrcElpQm1hV3hzUFNJalpqZG1PV1poSWk4K0RRb2dJQ0FnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpVUdGMGFGODFNeUlnWkdGMFlTMXVZVzFsUFNKUVlYUm9JRFV6SWlCa1BTSk5NVEF1TVRBMUxERXVOalV4WXpNdU1ESXpMREl1TURReUxERXhMamMxT0MweUxqTXNNVEV1TnpVNExUSXVNM010TlM0Mk9UVXVOakkzTFRZdU55MHVOek16V2lJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9Namc0TGpZeE9TQXpPRFl1TmpnNUtTQnliM1JoZEdVb01URTFLU0lnWm1sc2JEMGlJMlkzWmpsbVlTSXZQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnYVdROUlsQmhkR2hmTlRRaUlHUmhkR0V0Ym1GdFpUMGlVR0YwYUNBMU5DSWdaRDBpVFRFeExqQTRPUzB6TGpjME5HTXpMamsyT0N3M0xqYzRMREUwTGpNc01pNHpNRGtzTVRRdU15d3lMak13T1ZNeE5pNHdOREV1TmpjMExERXpMakk0TVMwekxqZ3pObG9pSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtESTVNUzR4TlRJZ016WXpMalUwTVNrZ2NtOTBZWFJsS0RFeU1Da2lJR1pwYkd3OUlpTm1OMlk1Wm1FaUx6NE5DaUFnSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKUVlYUm9YelUxSWlCa1lYUmhMVzVoYldVOUlsQmhkR2dnTlRVaUlHUTlJazB0TGpFM09DdzFMall5TW1NeE15MDFMalU1TlN3eU9TNDBMVE11TkRReExESTVMalF0TXk0ME5ERnpMVGt1TURJNUxqRTJOQzB5Tmk0MU5ERXNOQzR5V2lJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9Nekl3TGpVMU5pQXpOVEF1TWpFektTQnliM1JoZEdVb09Ta2lJR1pwYkd3OUlpTm1OMlk1Wm1FaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4TDJjK0RRb2dJQ0FnSUNBZ0lEd3ZaejROQ2lBZ0lDQWdJRHd2Wno0TkNpQWdJQ0E4TDJjK0RRb2dJRHd2Wno0TkNqd3ZjM1puUGcwS1wiIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2VsZW1lbnQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAiLCJpbXBvcnQgaW50ZXJwb2xhdGVIVE1MV2l0aExhbmcgZnJvbSBcIi4uL2xpYi9pbnRlcnBvbGF0ZUhUTUxXaXRoTGFuZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHByb3RlY3RlZCBzcjogU2hhZG93Um9vdDtcbiAgcHJvdGVjdGVkIGVsZW1lbnRCb2R5OiBIVE1MRWxlbWVudFxuXG4gIHByaXZhdGUgbW9zdElubmVyQ29tcG9uZW50Ym9keTogSFRNTEVsZW1lbnQgfCBTaGFkb3dSb290XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudEJvZHlFeHRlbnRpb24/OiBIVE1MRWxlbWVudCB8IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNyID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6IFwib3BlblwifSk7XG5cbiAgICBcbiAgICBcbiAgICBcblxuICAgIHRoaXMucmVpbml0SFRNTCgpXG5cbiAgICBcbiAgfVxuXG4gIHByb3RlY3RlZCByZWluaXRIVE1MKCkge1xuICAgIHRoaXMuc3IuaHRtbChcIlwiKVxuICAgIGlmICh0aGlzLmVsZW1lbnRCb2R5RXh0ZW50aW9uICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5lbGVtZW50Qm9keSA9IGNlKFwiZWxlbWVudC1ib2R5XCIpXG4gICAgICBpZiAodGhpcy5lbGVtZW50Qm9keUV4dGVudGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubW9zdElubmVyQ29tcG9uZW50Ym9keSA9IHRoaXMuZWxlbWVudEJvZHkgIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMubW9zdElubmVyQ29tcG9uZW50Ym9keSA9IHRoaXMuZWxlbWVudEJvZHlFeHRlbnRpb25cbiAgICAgICAgdGhpcy5lbGVtZW50Qm9keS5hcGQodGhpcy5tb3N0SW5uZXJDb21wb25lbnRib2R5KVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNyLmh0bWwoXCI8IS0tR2VuZXJhbCBzdHlsZXMtLT48c3R5bGU+XCIgKyByZXF1aXJlKCcuL2VsZW1lbnQuY3NzJykudG9TdHJpbmcoKSArIFwiPC9zdHlsZT48IS0tTWFpbiBzdHlsZXMtLT48c3R5bGU+XCIgKyB0aGlzLnN0bCgpICsgXCI8L3N0eWxlPlwiKVxuICAgICAgdGhpcy5zci5hcHBlbmQodGhpcy5lbGVtZW50Qm9keSlcbiAgICAgIHRoaXMubW9zdElubmVyQ29tcG9uZW50Ym9keS5pbm5lckhUTUwgPSBpbnRlcnBvbGF0ZUhUTUxXaXRoTGFuZyh0aGlzLnB1ZygpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMubW9zdElubmVyQ29tcG9uZW50Ym9keSA9IHRoaXMuc3JcbiAgICAgIHRoaXMuc3IuaHRtbChcIjwhLS1HZW5lcmFsIHN0eWxlcy0tPjxzdHlsZT5cIiArIHJlcXVpcmUoJy4vZWxlbWVudC5jc3MnKS50b1N0cmluZygpICsgXCI8L3N0eWxlPjwhLS1NYWluIHN0eWxlcy0tPjxzdHlsZT5cIiArIHRoaXMuc3RsKCkgKyBcIjwvc3R5bGU+XCIgKyBpbnRlcnBvbGF0ZUhUTUxXaXRoTGFuZyh0aGlzLnB1ZygpKSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyTmFtZTogc3RyaW5nLCBvbGRWYWw6IHN0cmluZywgbmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzW2F0dHJOYW1lXSA9IG5ld1ZhbFxuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHN0bCgpOiBzdHJpbmc7XG4gIHB1YmxpYyBhYnN0cmFjdCBwdWcoKTogc3RyaW5nO1xuICAvKipcbiAgICogQXBwZW5kcyB0byBTaGFkb3dSb290XG4gICAqL1xuICBwdWJsaWMgc3JhKC4uLmVsZW1zOiBIVE1MRWxlbWVudFtdKTogdm9pZCB7XG4gICAgZWxlbXMuZWEoKGUpID0+IHtcbiAgICAgIHRoaXMuc3IuYXBwZW5kKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHEocXM/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5tb3N0SW5uZXJDb21wb25lbnRib2R5LmNoaWxkcyhxcylcbiAgfVxuICBwdWJsaWMgYXBkKC4uLmVsZW1zOiBFbGVtZW50W10pIHtcbiAgICB0aGlzLm1vc3RJbm5lckNvbXBvbmVudGJvZHkuYXBwZW5kKC4uLmVsZW1zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuXG4vKlxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vLi4vZWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGFtcGxlIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcblxuICB9XG4gIHN0bCgpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vZXhhbXBsZS5jc3NcIikudG9TdHJpbmcoKVxuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vZXhhbXBsZS5wdWdcIikudG9TdHJpbmcoKVxuICB9XG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2MtZXhhbXBsZScsIEV4YW1wbGUpO1xuXG4qL1xuIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2lucHV0LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCJcIjsiLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiO1xuaW1wb3J0IHsgRWxlbWVudExpc3QsIFRlbCB9IGZyb20gXCJleHRlbmRlZC1kb21cIlxuXG5cbnZhciBlbWFpbFZhbGlkYXRpb25SZWdleCA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG5cbmV4cG9ydCB0eXBlIFZhbHVlID0gc3RyaW5nIHwgbnVtYmVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IGV4dGVuZHMgRWxlbWVudCB7XG4gIHByaXZhdGUgcGxhY2Vob2xkZXJFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGNlKFwiaW5wdXRcIik7XG4gIHByaXZhdGUgaXNVcDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzRm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGFsbEVsZW1zOiBFbGVtZW50TGlzdDtcblxuICBwcml2YXRlIGVudGVyQWxyZWFkeVByZXNzZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF90eXBlOiBcInBhc3N3b3JkXCIgfCBcInRleHRcIiB8IFwibnVtYmVyXCIgfCBcImVtYWlsXCIgfCBcInVwcGVyY2FzZVwiO1xuXG4gIHByaXZhdGUgdW5pbnRydXNpdmVMaXN0ZW5lcjogVGVsID0gdGhpcy5pbnB1dC5scyhcImlucHV0XCIsICgpID0+IHtcbiAgICBpZiAodGhpcy5pbnRydXNpdmVWYWxpZGF0aW9uKSB7XG4gICAgICB0aGlzLnVuaW50cnVzaXZlTGlzdGVuZXIuZGlzYWJsZSgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGludmFsaWQgPSB0aGlzLnZhbGlkYXRlKClcblxuXG4gICAgaWYgKCFpbnZhbGlkKSB7XG4gICAgICB0aGlzLnNob3dJbnZhbGlkYXRpb24oZmFsc2UpXG4gICAgICB0aGlzLnVuaW50cnVzaXZlTGlzdGVuZXIuZGlzYWJsZSgpXG4gICAgfVxuICB9LCBmYWxzZSlcbiAgY29uc3RydWN0b3IocGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB8IFwidGV4dFwiIHwgXCJudW1iZXJcIiB8IFwiZW1haWxcIiB8IFwidXBwZXJjYXNlXCIgPSBcInRleHRcIiwgcHVibGljIHN1Ym1pdENhbGxiYWNrPzogKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGU6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQsIHZhbHVlPzogYW55LCBwdWJsaWMgY3VzdG9tVmVyaWZpY2F0aW9uPzogKHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyKSA9PiAoYm9vbGVhbiB8IHN0cmluZyB8IHZvaWQpLCBwdWJsaWMgaW50cnVzaXZlVmFsaWRhdGlvbj86IGJvb2xlYW4pIHtcbiAgICBzdXBlcihmYWxzZSk7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMuaW5wdXQuc3BlbGxjaGVjayA9IGZhbHNlXG5cbiAgICB0aGlzLnBsYWNlaG9sZGVyRWxlbSA9IGNlKFwiaW5wdXQtcGxhY2Vob2xkZXJcIik7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIHRoaXMucGxhY2Vob2xkZXJFbGVtLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wbGFjZWhvbGRlckVsZW0udGFiSW5kZXggPSAtMVxuICAgIFxuXG4gICAgLy8gLS0tLS0gVmFsaWRhdGlvbiBzdGFydFxuXG4gICAgLy8gdW5pbnRydXNpdmVcblxuICAgIHRoaXMuaW5wdXQub24oXCJibHVyXCIsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbnRydXNpdmVWYWxpZGF0aW9uKSByZXR1cm5cbiAgICAgIGxldCBpbnZhbGlkID0gdGhpcy52YWxpZGF0ZSgpXG4gICAgICBpZiAoaW52YWxpZCkge1xuICAgICAgICB0aGlzLnNob3dJbnZhbGlkYXRpb24oaW52YWxpZClcbiAgICAgICAgdGhpcy51bmludHJ1c2l2ZUxpc3RlbmVyLmVuYWJsZSgpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbnRydXNpdmVcbiAgICB0aGlzLmlucHV0Lm9uKFwiaW5wdXRcIiwgKCkgPT4ge1xuXG5cbiAgICAgIGlmICghdGhpcy5pbnRydXNpdmVWYWxpZGF0aW9uKSByZXR1cm5cbiAgICAgIGxldCBpbnZhbGlkID0gdGhpcy52YWxpZGF0ZSgpXG5cbiAgICAgIHRoaXMuc2hvd0ludmFsaWRhdGlvbihpbnZhbGlkKVxuICAgIH0pXG5cblxuICAgIC8vIC0tLS0tIFZhbGlkYXRpb24gZW5kXG4gIFxuXG4gICAgbGV0IG1vdXNlZG93biA9IGZhbHNlXG4gICAgdGhpcy5pbnB1dC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgbW91c2Vkb3duID0gdHJ1ZVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnB1dC5vbihcImZvY3VzXCIsIChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlZG93bikge1xuICAgICAgICBpZiAodGhpcy5pbnB1dC52YWx1ZSAhPT0gXCJcIikgdGhpcy5pbnB1dC5zZWxlY3QoKSAgXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmlucHV0Lm9uKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICBtb3VzZWRvd24gPSBmYWxzZVxuICAgICAgdGhpcy5lbnRlckFscmVhZHlQcmVzc2VkID0gZmFsc2VcbiAgICB9KVxuXG4gICAgdGhpcy5pbnB1dC5vbihcImZvY3VzXCIsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB0aGlzLmlucHV0LmZvY3VzKClcbiAgICAgIHRoaXMucGxhY2VIb2xkZXJVcCgpO1xuICAgIH0pO1xuICAgIHRoaXMuaW5wdXQub24oXCJibHVyXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09PSBcIlwiKSB0aGlzLnBsYWNlSG9sZGVyRG93bigpO1xuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuaW5wdXQub24oXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiB0aGlzLnN1Ym1pdENhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuZW50ZXJBbHJlYWR5UHJlc3NlZCAmJiAhdGhpcy5jdXJyZW50bHlJbnZhbGlkKSB7XG4gICAgICAgIHRoaXMuZW50ZXJBbHJlYWR5UHJlc3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3VibWl0Q2FsbGJhY2sodGhpcy52YWx1ZSwgZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbnB1dC5vbihcImtleWRvd25cIiwgKGU6IGFueSkgPT4ge1xuICAgICAgZS5wcmV2ZW50SG90a2V5ID0gXCJpbnB1dFwiO1xuICAgIH0pXG4gICAgdGhpcy5pbnB1dC5vbihcImtleXVwXCIsICh7a2V5fSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIHRoaXMuZW50ZXJBbHJlYWR5UHJlc3NlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5vbihcImZvY3VzXCIsICgpID0+IHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLmFwZCh0aGlzLnBsYWNlaG9sZGVyRWxlbSwgdGhpcy5pbnB1dCBhcyBhbnkgYXMgSFRNTEVsZW1lbnQpO1xuICAgIHRoaXMuYWxsRWxlbXMgPSBuZXcgRWxlbWVudExpc3QodGhpcy5wbGFjZWhvbGRlckVsZW0sIHRoaXMuaW5wdXQgYXMgYW55IGFzIEhUTUxFbGVtZW50KTtcblxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGlzRGlzYWJsZWQgPSBmYWxzZVxuICBwdWJsaWMgZGlzYWJsZSgpIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSByZXR1cm5cbiAgICB0aGlzLmlzRGlzYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5hbGxFbGVtcy5hZGRDbGFzcyhcImRpc2FibGVkXCIpXG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB0aGlzLnBsYWNlaG9sZGVyRWxlbS5mb2N1cygpXG4gICAgdGhpcy5lbnRlckFscmVhZHlQcmVzc2VkID0gZmFsc2VcbiAgfVxuXG4gIHB1YmxpYyBmb2N1cygpIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSBzdXBlci5mb2N1cygpXG4gICAgZWxzZSB0aGlzLmlucHV0LmZvY3VzKClcbiAgfVxuXG4gIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlXG4gICAgdGhpcy5hbGxFbGVtcy5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpXG4gICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IGZhbHNlXG4gICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB0aGlzLmlucHV0LmZvY3VzKClcbiAgfVxuXG4gIHByaXZhdGUgaW5wdXRsaXN0ZW5lcnM6IE1hcDwodmFsdWU6IFZhbHVlLCBlPzogSW5wdXRFdmVudCkgPT4gdm9pZCwgKGU6IElucHV0RXZlbnQpID0+IHZvaWQ+ID0gbmV3IE1hcCgpXG4gIHB1YmxpYyBvbklucHV0KGY6ICh2YWx1ZTogVmFsdWUsIGU/OiBJbnB1dEV2ZW50KSA9PiB2b2lkKSB7XG4gICAgbGV0IGlubmVyID0gKGU6IElucHV0RXZlbnQpID0+IHtcbiAgICAgIGlmICghdGhpcy5jdXJyZW50bHlJbnZhbGlkKSBmKHRoaXMudmFsdWUsIGUpXG4gICAgICBlbHNlIGYoXCJcIiwgZSlcbiAgICB9XG4gICAgdGhpcy5pbnB1dGxpc3RlbmVycy5zZXQoZiwgaW5uZXIpXG4gICAgdGhpcy5pbnB1dC5vbihcImlucHV0XCIsIGlubmVyKVxuICB9XG4gIHB1YmxpYyBvZmZJbnB1dChmOiAodmFsdWU6IFZhbHVlLCBlPzogSW5wdXRFdmVudCkgPT4gdm9pZCkge1xuICAgIHRoaXMuaW5wdXQub2ZmKFwiaW5wdXRcIiwgdGhpcy5pbnB1dGxpc3RlbmVycy5nZXQoZikpXG4gICAgdGhpcy5pbnB1dGxpc3RlbmVycy5kZWxldGUoZilcbiAgfVxuXG5cbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih0bzogc3RyaW5nKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlckVsZW0udGV4dCh0byk7XG4gIH1cbiAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyRWxlbS50ZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSB1cHBlckNhc2VQYXJzZUxpc3RlbmVyID0gdGhpcy5pbnB1dC5scyhcImlucHV0XCIsICgpID0+IHtcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpXG4gIH0pXG4gIHB1YmxpYyBzZXQgdHlwZSh0bzogXCJwYXNzd29yZFwiIHwgXCJ0ZXh0XCIgfCBcIm51bWJlclwiIHwgXCJlbWFpbFwiIHwgXCJ1cHBlcmNhc2VcIikge1xuICAgIHRoaXMuaW50cnVzaXZlVmFsaWRhdGlvbiA9IHRvID09PSBcInBhc3N3b3JkXCIgfHwgdG8gPT09IFwibnVtYmVyXCJcbiAgICBpZiAodG8gPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgdGhpcy5pbnB1dC50eXBlID0gdG87XG4gICAgICB0aGlzLnVwcGVyQ2FzZVBhcnNlTGlzdGVuZXIuZGlzYWJsZSgpXG4gICAgfVxuICAgIGVsc2UgaWYgKHRvID09PSBcInVwcGVyY2FzZVwiKSB7XG4gICAgICB0aGlzLnVwcGVyQ2FzZVBhcnNlTGlzdGVuZXIuZW5hYmxlKClcbiAgICAgIHRoaXMuaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgdGhpcy51cHBlckNhc2VQYXJzZUxpc3RlbmVyLmRpc2FibGUoKVxuICAgIH1cbiAgICB0aGlzLl90eXBlID0gdG87XG4gIH1cbiAgcHVibGljIGdldCB0eXBlKCk6IFwicGFzc3dvcmRcIiB8IFwidGV4dFwiIHwgXCJudW1iZXJcIiB8IFwiZW1haWxcIiB8IFwidXBwZXJjYXNlXCIge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG4gIHB1YmxpYyBpc1ZhbGlkKGVtcHR5QWxsb3dlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBsZXQgdmFsaWQgPSAhdGhpcy52YWxpZGF0ZSgpO1xuICAgIGlmIChlbXB0eUFsbG93ZWQpIHJldHVybiB2YWxpZDtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSAhPT0gXCJcIiAmJiB2YWxpZDtcbiAgfVxuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFZhbHVlIHtcbiAgICBsZXQgdiA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuICt2O1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuICBwdWJsaWMgc2V0IHZhbHVlKHRvOiBWYWx1ZSkge1xuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB0by50b1N0cmluZygpO1xuICAgIHRoaXMuYWxpZ25QbGFjZUhvbGRlcigpO1xuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkgcmV0dXJuXG5cbiAgICAvLyB1bmludHJ1c2ljZSB2YWxpZGF0aW9uXG4gICAgKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmludHJ1c2l2ZVZhbGlkYXRpb24pIHtcbiAgICAgICAgdGhpcy51bmludHJ1c2l2ZUxpc3RlbmVyLmRpc2FibGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBpbnZhbGlkID0gdGhpcy52YWxpZGF0ZSgpXG4gIFxuICBcbiAgICAgIGlmICghaW52YWxpZCkge1xuICAgICAgICB0aGlzLnNob3dJbnZhbGlkYXRpb24oZmFsc2UpXG4gICAgICAgIHRoaXMudW5pbnRydXNpdmVMaXN0ZW5lci5kaXNhYmxlKClcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgLy8gaW50cnVzaXZlIHZhbGlkYXRpb24gaWYgKCF0aGlzLmludHJ1c2l2ZVZhbGlkYXRpb24pIHJldHVyblxuICAgICgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaW50cnVzaXZlVmFsaWRhdGlvbikgcmV0dXJuXG4gICAgICBsZXQgaW52YWxpZCA9IHRoaXMudmFsaWRhdGUoKVxuXG4gICAgICB0aGlzLnNob3dJbnZhbGlkYXRpb24oaW52YWxpZClcbiAgICB9KSgpXG5cblxuICAgIC8vIG9uSW5wdXRcbiAgICB0aGlzLmlucHV0bGlzdGVuZXJzLmZvckVhY2goKGlubmVyLCBmKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY3VycmVudGx5SW52YWxpZCkgZih0aGlzLnZhbHVlKVxuICAgICAgZWxzZSBmKFwiXCIpXG4gICAgfSlcbiAgICBcblxuICAgIFxuICB9XG4gIHByaXZhdGUgdmFsaWRhdGUoKTogc3RyaW5nIHwgYm9vbGVhbiB8IHZvaWQge1xuICAgIGxldCBpbnZhbGlkOiBzdHJpbmcgfCBib29sZWFuIHwgdm9pZCA9IGZhbHNlXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJudW1iZXJcIikgaW52YWxpZCA9IGlzTmFOKHRoaXMudmFsdWUgYXMgbnVtYmVyKSA/IFwiRXhwZWN0ZWQgYSBudW1iZXJcIiA6IGZhbHNlO1xuICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJlbWFpbFwiKSBpbnZhbGlkID0gZW1haWxWYWxpZGF0aW9uUmVnZXgudGVzdCgodGhpcy52YWx1ZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCkpID8gXCJUaGlzIGlzIG5vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcIiA6IGZhbHNlO1xuICAgIGlmICh0aGlzLmN1c3RvbVZlcmlmaWNhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcmV0dXJuSW52YWxpZCA9IHRoaXMuY3VzdG9tVmVyaWZpY2F0aW9uKHRoaXMudmFsdWUpXG4gICAgICBpZiAodHlwZW9mIHJldHVybkludmFsaWQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIGlmICghcmV0dXJuSW52YWxpZCkgaW52YWxpZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcmV0dXJuSW52YWxpZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAocmV0dXJuSW52YWxpZCkgaW52YWxpZCA9IHJldHVybkludmFsaWRcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXQudmFsdWUgPT09IFwiXCIpIGludmFsaWQgPSBmYWxzZVxuICAgIHJldHVybiBpbnZhbGlkO1xuICB9XG4gIHByaXZhdGUgYWxpZ25QbGFjZUhvbGRlcigpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PT0gXCJcIiAmJiAhdGhpcy5pc0ZvY3VzZWQpIHRoaXMucGxhY2VIb2xkZXJEb3duKFwiY3NzXCIpO1xuICAgIGVsc2UgdGhpcy5wbGFjZUhvbGRlclVwKFwiY3NzXCIpO1xuICB9XG4gIHByaXZhdGUgYXN5bmMgcGxhY2VIb2xkZXJVcChmdW5jOiBcImFuaW1cIiB8IFwiY3NzXCIgPSBcImFuaW1cIikge1xuICAgIGlmICghdGhpcy5pc1VwKSB7XG4gICAgICAvLyBUaGlzIHNlZW1zIHRvIGJlIHRvbyBjb21wbGV4IGZvciB0eXBlc2NyaXB0LiBNYXliZSBpbiB0aGUgZnV0dXJlIHRoZSB0cy1pZ25vcmUgY2FuIGJlIHJlbW92ZWQuIFByb29mIHRoYXQgaXQgc2hvdWxkIHdvcmsuXG4gICAgICAvLyB0aGlzLnBsYWNlaG9sZGVyLmNzcyh7bWFyZ2luTGVmdDogXCIxM3B4XCIsIG1hcmdpblRvcDogXCIxMHB4XCIsIGZvbnRTaXplOiBcIjFlbVwifSlcbiAgICAgIC8vIHRoaXMucGxhY2Vob2xkZXIuYW5pbSh7bWFyZ2luTGVmdDogXCIxM3B4XCIsIG1hcmdpblRvcDogXCIxMHB4XCIsIGZvbnRTaXplOiBcIjFlbVwifSlcbiAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgdGhpcy5wbGFjZWhvbGRlckVsZW1bZnVuY10oe21hcmdpblRvcDogXCItMS4yZW1cIiwgbWFyZ2luTGVmdDogMCwgZm9udFNpemU6IFwiLjhlbVwifSk7XG4gICAgICB0aGlzLmlzVXAgPSB0cnVlO1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckVsZW0uY3NzKFwiY3Vyc29yXCIsIFwiYXV0b1wiKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBwbGFjZUhvbGRlckRvd24oZnVuYzogXCJhbmltXCIgfCBcImNzc1wiID0gXCJhbmltXCIpIHtcbiAgICBpZiAodGhpcy5pc1VwKSB7XG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJFbGVtW2Z1bmNdKHttYXJnaW5MZWZ0OiBcIjEzcHhcIiwgbWFyZ2luVG9wOiBcIjEwcHhcIiwgZm9udFNpemU6IFwiMWVtXCJ9KTtcbiAgICAgIHRoaXMuaXNVcCA9IGZhbHNlO1xuICAgICAgdGhpcy5wbGFjZWhvbGRlckVsZW0uY3NzKFwiY3Vyc29yXCIsIFwidGV4dFwiKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIHJlYWRvbmx5IGN1cnJlbnRseUludmFsaWQgPSBmYWxzZVxuICBwdWJsaWMgc2hvd0ludmFsaWRhdGlvbih2YWxpZDogYm9vbGVhbiB8IHN0cmluZyB8IHZvaWQgPSB0cnVlKSB7XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLmFsbEVsZW1zLmFkZENsYXNzKFwiaW52YWxpZFwiKTtcbiAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJJbnZhbGlkIGlucHV0XCI7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgdmFsaWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHZhbGlkXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy50aXRsZSA9IFwiXCI7XG4gICAgICB0aGlzLmFsbEVsZW1zLnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcbiAgICB9XG5cbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLmN1cnJlbnRseUludmFsaWQgPSAhIXZhbGlkXG4gIH1cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInBsYWNlaG9sZGVyXCIsIFwidHlwZVwiLCBcInZhbHVlXCIsIFwiaW50cnVzaXZlVmFsaWRhdGlvblwiXTtcbiAgfVxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vaW5wdXQuY3NzJykudG9TdHJpbmcoKTtcbiAgfVxuICBwdWcoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL2lucHV0LnB1Z1wiKS5kZWZhdWx0XG4gIH1cblxufVxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLWlucHV0JywgSW5wdXQpO1xuIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhbmVsTWFuYWdlci5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICIsImV4cG9ydCBkZWZhdWx0IFwiPGxlZnQtY29udGFpbmVyIGNsYXNzPVxcXCJjb250YWluZXJcXFwiPjwvbGVmdC1jb250YWluZXI+PHJpZ2h0LWNvbnRhaW5lciBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj48L3JpZ2h0LWNvbnRhaW5lcj5cIjsiLCJpbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiXG5pbXBvcnQgUGFuZWwgZnJvbSBcIi4uL19wYW5lbC9wYW5lbFwiO1xuaW1wb3J0IEVkdVBhbmVsLCB7IEVudHJ5IH0gZnJvbSBcIi4uL19wYW5lbC9lZHVQYW5lbC9lZHVQYW5lbFwiO1xuaW1wb3J0IEluZm9ybVBhbmVsIGZyb20gXCIuLi9fcGFuZWwvaW5mb3JtUGFuZWwvaW5mb3JtUGFuZWxcIjtcbmltcG9ydCBMb2dpblBhbmVsIGZyb20gXCIuLi9fcGFuZWwvbG9naW5QYW5lbC9sb2dpblBhbmVsXCI7XG5pbXBvcnQgeyBEYXRhLCBEYXRhQmFzZSwgRGF0YUFycmF5IH0gZnJvbSBcImZyb250LWRiXCJcbmltcG9ydCBTZXRVcENvbmZpcm1hdGlvblBhbmVsIGZyb20gXCIuLi9fcGFuZWwvc2V0VXBDb25maXJtYXRpb25QYW5lbC9zZXRVcENvbmZpcm1hdGlvblBhbmVsXCI7XG5pbXBvcnQgU2V0VXBQYW5lbCBmcm9tIFwiLi4vX3BhbmVsL3NldFVwUGFuZWwvc2V0VXBQYW5lbFwiO1xuaW1wb3J0IGRlbGF5IGZyb20gXCJkZWxheVwiO1xuaW1wb3J0ICogYXMgY2FyZFJlYWRlciBmcm9tIFwiLi4vLi4vbGliL2NhcmRSZWFkZXJcIlxuXG5cbnR5cGUgUGFuZWxJbmRleCA9IHtcbiAgZWR1OiBFZHVQYW5lbCxcbiAgaW5mbzogSW5mb3JtUGFuZWwsXG4gIGxvZ2luOiBMb2dpblBhbmVsLFxuICBzZXRVcENvbmZpcm1hdGlvblBhbmVsOiBTZXRVcENvbmZpcm1hdGlvblBhbmVsLFxuICBzZXRVcFBhbmVsOiBTZXRVcFBhbmVsXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxNYW5hZ2VyIGV4dGVuZHMgRWxlbWVudCB7XG4gIHByaXZhdGUgbGVmdENvbnRhaW5lciA9IHRoaXMucShcImxlZnQtY29udGFpbmVyXCIpXG4gIHByaXZhdGUgcmlnaHRDb250YWluZXIgPSB0aGlzLnEoXCJyaWdodC1jb250YWluZXJcIilcblxuICBwcml2YXRlIGxlZnQ6IFBhbmVsXG4gIHByaXZhdGUgcmlnaHQ6IFBhbmVsXG5cbiAgcHVibGljIHBhbmVsSW5kZXg6IFBhbmVsSW5kZXg7XG5cbiAgY29uc3RydWN0b3IoZW50cmllczogRGF0YUFycmF5PEVudHJ5PiwgZWR1RXhwZWN0ZWRDaGFuZ2VDYj86IChlZHU6IFwic3R1ZGVudFwiIHwgXCJ0ZWFjaGVyXCIpID0+IHZvaWQpIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLnBhbmVsSW5kZXggPSB7XG4gICAgICBlZHU6IG5ldyBFZHVQYW5lbCh0aGlzLCBlbnRyaWVzLCBlZHVFeHBlY3RlZENoYW5nZUNiKSxcbiAgICAgIGluZm86IG5ldyBJbmZvcm1QYW5lbCh0aGlzLCBcIkxhYkF1dGhcIiwgXCJBIHRlYWNoZXIgbWF5IGxvZyBpbiB3aXRoIGhpcyBlZHUuY2FyZCB0byBzdGFydCB0aGUgc2Vzc2lvbi5cIiksXG4gICAgICBsb2dpbjogbmV3IExvZ2luUGFuZWwodGhpcyksXG4gICAgICBzZXRVcENvbmZpcm1hdGlvblBhbmVsOiBuZXcgU2V0VXBDb25maXJtYXRpb25QYW5lbCh0aGlzKSxcbiAgICAgIHNldFVwUGFuZWw6IG5ldyBTZXRVcFBhbmVsKHRoaXMsIFwidGhlcmVcIilcbiAgICB9XG4gIH1cblxuXG4gIHB1YmxpYyBzZXRQYW5lbChwYW5lbDoga2V5b2YgUGFuZWxJbmRleCwgc2lkZTogXCJsZWZ0XCIgfCBcInJpZ2h0XCIpIHtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IG5ld1BhbmVsID0gdGhpcy5wYW5lbEluZGV4W3BhbmVsXVxuICAgICAgaWYgKG5ld1BhbmVsID09PSB0aGlzLmxlZnQgfHwgbmV3UGFuZWwgPT09IHRoaXMucmlnaHQpIHJldHVyblxuXG4gICAgICBpZiAoc2lkZSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgaWYgKG5ld1BhbmVsLnByZWZlcmVkV2lkdGggPT09IFwiYmlnXCIpIHtcbiAgICAgICAgICB0aGlzLmxlZnRDb250YWluZXIuYW5pbSh7d2lkdGg6IFwiNTguNzUlXCJ9LCA3MDApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3UGFuZWwucHJlZmVyZWRXaWR0aCA9PT0gXCJzbWFsbFwiKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0Q29udGFpbmVyLmFuaW0oe3dpZHRoOiBcIjQxLjI1JVwifSwgNzAwKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXdQYW5lbC5wcmVmZXJlZFdpZHRoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0Q29udGFpbmVyLmFuaW0oe3dpZHRoOiBuZXdQYW5lbC5wcmVmZXJlZFdpZHRoICsgXCIlXCJ9LCA3MDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuXG5cbiAgICAgIGlmIChzaWRlID09PSBcImxlZnRcIikge1xuICAgICAgICBsZXQgbGFzdExlZnQgPSB0aGlzLmxlZnRcbiAgICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5wYW5lbEluZGV4W3BhbmVsXVxuICAgICAgICB0aGlzLmxlZnRDb250YWluZXIuYXBkKHRoaXMubGVmdCk7XG4gICAgICAgIGlmIChsYXN0TGVmdCkge1xuICAgICAgICAgIGxhc3RMZWZ0LmFuaW0oe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDV9LCAzMDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxhc3RMZWZ0KSBsYXN0TGVmdC5kZWFjdGl2YXRlKClcbiAgICAgICAgICAgIGxhc3RMZWZ0LnJlbW92ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBkZWxheSgxNTApXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sZWZ0LmFuaW0oW3tvcGFjaXR5OiAwLCB0cmFuc2xhdGVYOiAtNSwgb2Zmc2V0OiAwfSwge29wYWNpdHk6IDEsIHRyYW5zbGF0ZVg6IC4xfV0sIDQwMCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxlZnQuYWN0aXZhdGUoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDApXG4gICAgICAgIFxuICAgICAgfVxuICAgICAgaWYgKHNpZGUgPT09IFwicmlnaHRcIikge1xuICAgICAgICBsZXQgbGFzdFJpZ2h0ID0gdGhpcy5yaWdodFxuICAgICAgICB0aGlzLnJpZ2h0ID0gdGhpcy5wYW5lbEluZGV4W3BhbmVsXVxuICAgICAgICB0aGlzLnJpZ2h0Q29udGFpbmVyLmFwZCh0aGlzLnJpZ2h0KVxuICAgICAgICBpZiAobGFzdFJpZ2h0KSB7XG4gICAgICAgICAgbGFzdFJpZ2h0LmFuaW0oe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IDV9LCAzMDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxhc3RSaWdodCkgbGFzdFJpZ2h0LmRlYWN0aXZhdGUoKVxuICAgICAgICAgICAgbGFzdFJpZ2h0LnJlbW92ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBkZWxheSgxNTApXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmlnaHQuYW5pbShbe29wYWNpdHk6IDAsIHRyYW5zbGF0ZVg6IC01LCBvZmZzZXQ6IDB9LCB7b3BhY2l0eTogMSwgdHJhbnNsYXRlWDogLjF9XSwgNDAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmlnaHQuYWN0aXZhdGUoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJpZ2h0ICYmIHRoaXMubGVmdCkge1xuICAgICAgICBsZXQgbm90RXhwbGljaXRseVByZXZlbnRlZCA9ICF0aGlzLnJpZ2h0LnByZXZlbnRGb2N1c0ludGVyZmVyZW5jZSAmJiAhdGhpcy5sZWZ0LnByZXZlbnRGb2N1c0ludGVyZmVyZW5jZVxuXG4gICAgICAgIGlmICgodGhpcy5yaWdodC53YW50c0NhcmRSZWFkZXIgfHwgdGhpcy5sZWZ0LndhbnRzQ2FyZFJlYWRlcikgJiYgbm90RXhwbGljaXRseVByZXZlbnRlZCkgY2FyZFJlYWRlci5lbmFibGUoKVxuICAgICAgICBlbHNlIGNhcmRSZWFkZXIuZGlzYWJsZSgpXG4gICAgICB9XG4gICAgfSkoKTtcbiAgICBcblxuICAgIFxuICAgIHJldHVybiBkZWxheSg3MDApXG4gIH1cblxuICBzdGwoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL3BhbmVsTWFuYWdlci5jc3NcIikudG9TdHJpbmcoKVxuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vcGFuZWxNYW5hZ2VyLnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLXBhbmVsLW1hbmFnZXInLCBQYW5lbE1hbmFnZXIpOyIsIlxuICAgICAgICB2YXIgcmVzdWx0ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zZXRVcElucHV0LmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgIiwiZXhwb3J0IGRlZmF1bHQgXCI8dGV4dC1jb25hdGluZXI+IDx0ZXh0LXBhcmFncmFwaD48L3RleHQtcGFyYWdyYXBoPjxjLWlucHV0PjwvYy1pbnB1dD48L3RleHQtY29uYXRpbmVyPlwiOyIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCJcbmltcG9ydCBJbnB1dCwgeyBWYWx1ZSB9IGZyb20gXCIuLi9pbnB1dC9pbnB1dFwiXG5pbXBvcnQgXCIuLi9pbnB1dC9pbnB1dFwiXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0VXBJbnB1dCBleHRlbmRzIEVsZW1lbnQge1xuXG4gIHByaXZhdGUgaW5wdXRFbGVtID0gdGhpcy5xKFwiYy1pbnB1dFwiKS5maXJzdCBhcyBJbnB1dFxuICBwcml2YXRlIHF1ZXN0aW9uRWxlbSA9IHRoaXMucShcInRleHQtcGFyYWdyYXBoXCIpXG4gIFxuICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogc3RyaW5nLCB0eXBlOiBcIm51bWJlclwiIHwgXCJwYXNzd29yZFwiIHwgXCJ0ZXh0XCIgfCBcImVtYWlsXCIgfCBcInVwcGVyY2FzZVwiID0gXCJ0ZXh0XCIsIHB1YmxpYyBjaGFuZ2VDYWxsYmFjaz86IChjb250ZW50OiBWYWx1ZSwgZTogSW5wdXRFdmVudCkgPT4gdm9pZCwgcHVibGljIHN1Ym1pdENhbGxiYWNrPzogKGNvbnRlbnQ6IFZhbHVlLCBlOiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkLCBjdW5zdG9tdmVyaWZhY3Rpb24/OiAodmFsdWU/OiBzdHJpbmcgfCBudW1iZXIpID0+IChib29sZWFuIHwgc3RyaW5nIHwgdm9pZCkpIHtcbiAgICBzdXBlcihmYWxzZSlcblxuICAgIHRoaXMuaW5wdXRFbGVtLnR5cGUgPSB0eXBlXG4gICAgXG4gICAgdGhpcy5xdWVzdGlvbkVsZW0uaHRtbChxdWVzdGlvbilcblxuICAgIHRoaXMuaW5wdXRFbGVtLm9uSW5wdXQoKHMsIGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZUNhbGxiYWNrKSB0aGlzLmNoYW5nZUNhbGxiYWNrKHMsIGUpXG4gICAgfSlcbiAgICB0aGlzLmlucHV0RWxlbS5zdWJtaXRDYWxsYmFjayA9IChzLCBlKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdWJtaXRDYWxsYmFjaykgdGhpcy5zdWJtaXRDYWxsYmFjayhzLCBlKVxuICAgIH1cblxuICAgIHRoaXMuaW5wdXRFbGVtLmN1c3RvbVZlcmlmaWNhdGlvbiA9IGN1bnN0b212ZXJpZmFjdGlvblxuICB9XG5cbiAgcHVibGljIGZvY3VzKCkge1xuICAgIHRoaXMuaW5wdXRFbGVtLmZvY3VzKClcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dEVsZW0udmFsdWVcbiAgfVxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0RWxlbS52YWx1ZSA9IHZhbFxuICB9XG5cbiAgc3RsKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9zZXRVcElucHV0LmNzc1wiKS50b1N0cmluZygpXG4gIH1cbiAgcHVnKCkge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi9zZXRVcElucHV0LnB1Z1wiKS5kZWZhdWx0XG4gIH1cbn1cblxuLy9AdHMtaWdub3JlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjLXNldHVwLWlucHV0JywgU2V0VXBJbnB1dCk7IiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpdGUuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAiLCJleHBvcnQgZGVmYXVsdCBcIlwiOyIsImltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCJcbmltcG9ydCBQYW5lbE1hbmFnZXIgZnJvbSBcIi4uL3BhbmVsTWFuYWdlci9wYW5lbE1hbmFnZXJcIlxuaW1wb3J0IHsgRGF0YUJhc2UsIERhdGEsIERhdGFBcnJheSB9IGZyb20gXCJmcm9udC1kYlwiXG5pbXBvcnQgZGVsYXkgZnJvbSBcImRlbGF5XCJcbmltcG9ydCB7IEVudHJ5IH0gZnJvbSBcIi4uL19wYW5lbC9lZHVQYW5lbC9lZHVQYW5lbFwiXG5pbXBvcnQgeyByZWNhbGwgfSBmcm9tIFwiYWphb25cIlxuaW1wb3J0IGFqYXggZnJvbSBcIi4uLy4uL2xpYi9hamF4XCJcblxuXG5jb25zdCB0ZXh0SW5kZXggPSB7XG4gIG9mZmxpbmU6IFwiT2ZmbGluZVwiLFxuICBvbmxpbmU6IFwiT25saW5lXCIsXG4gIHN5bmNpbmc6IFwiU3luY2luZ1wiXG59XG5cbmNvbnN0IHdpZHRoSW5kZXggPSB7XG4gIG9mZmxpbmU6IDU1LFxuICBvbmxpbmU6IDUwLFxuICBzeW5jaW5nOiA2MFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaXRlIGV4dGVuZHMgRWxlbWVudCB7XG4gIHByaXZhdGUgZW50cmllcyA9IG5ldyBEYXRhQmFzZShuZXcgRGF0YShbXSkpLmFzQXJyYXkgYXMgYW55IGFzIERhdGFBcnJheTxFbnRyeT5cblxuXG4gIHByaXZhdGUgbWFuYWdlciA9IG5ldyBQYW5lbE1hbmFnZXIodGhpcy5lbnRyaWVzLCAoZXhwZWN0ZWRDYXJkKSA9PiB7XG4gICAgaWYgKGV4cGVjdGVkQ2FyZCA9PT0gXCJzdHVkZW50XCIpIHtcbiAgICAgIHRoaXMub2ZmbGluZUluZGVjYXRvci5hbmltKHtiYWNrZ3JvdW5kOiBcIiNiZjI2MTJcIn0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGV4cGVjdGVkQ2FyZCA9PT0gXCJ0ZWFjaGVyXCIpIHtcbiAgICAgIHRoaXMub2ZmbGluZUluZGVjYXRvci5hbmltKHtiYWNrZ3JvdW5kOiBcIiMxZjdlZWFcIn0pXG4gICAgfVxuICB9KVxuICBwcml2YXRlIGljb25Db250YWluZXIgPSBjZShcImluZGVjYXRvci1pY29uXCIpXG4gIHByaXZhdGUgb2ZmbGluZVRleHRFbGVtID0gY2UoXCJpbmRlY2F0b3ItdGV4dFwiKVxuICBwcml2YXRlIG9mZmxpbmVJbmRlY2F0b3IgPSBjZShcIm9mZmxpbmUtaW5kZWNhdG9yXCIpLmFwZChcbiAgICB0aGlzLmljb25Db250YWluZXIuYXBkKFxuICAgICAgY2UoXCJvZmZsaW5lLWljb25cIikuaHRtbCgnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZmlsbD1cIndoaXRlXCIgZD1cIk0xOS4zNSAxMC4wNEMxOC42NyA2LjU5IDE1LjY0IDQgMTIgNGMtMS40OCAwLTIuODUuNDMtNC4wMSAxLjE3bDEuNDYgMS40NkMxMC4yMSA2LjIzIDExLjA4IDYgMTIgNmMzLjA0IDAgNS41IDIuNDYgNS41IDUuNXYuNUgxOWMxLjY2IDAgMyAxLjM0IDMgMyAwIDEuMTMtLjY0IDIuMTEtMS41NiAyLjYybDEuNDUgMS40NUMyMy4xNiAxOC4xNiAyNCAxNi42OCAyNCAxNWMwLTIuNjQtMi4wNS00Ljc4LTQuNjUtNC45NnpNMyA1LjI3bDIuNzUgMi43NEMyLjU2IDguMTUgMCAxMC43NyAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDExLjczbDIgMkwyMSAyMC43MyA0LjI3IDQgMyA1LjI3ek03LjczIDEwbDggOEg2Yy0yLjIxIDAtNC0xLjc5LTQtNHMxLjc5LTQgNC00aDEuNzN6XCIvPjwvc3ZnPicpLFxuICAgICAgY2UoXCJzeW5jaW5nLWljb25cIikuaHRtbCgnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDBWMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBmaWxsPVwid2hpdGVcIiBkPVwiTTE5LjM1IDEwLjA0QzE4LjY3IDYuNTkgMTUuNjQgNCAxMiA0IDkuMTEgNCA2LjYgNS42NCA1LjM1IDguMDQgMi4zNCA4LjM2IDAgMTAuOTEgMCAxNGMwIDMuMzEgMi42OSA2IDYgNmgxM2MyLjc2IDAgNS0yLjI0IDUtNSAwLTIuNjQtMi4wNS00Ljc4LTQuNjUtNC45NnpNMTkgMThINmMtMi4yMSAwLTQtMS43OS00LTQgMC0yLjA1IDEuNTMtMy43NiAzLjU2LTMuOTdsMS4wNy0uMTEuNS0uOTVDOC4wOCA3LjE0IDkuOTQgNiAxMiA2YzIuNjIgMCA0Ljg4IDEuODYgNS4zOSA0LjQzbC4zIDEuNSAxLjUzLjExYzEuNTYuMSAyLjc4IDEuNDEgMi43OCAyLjk2IDAgMS42NS0xLjM1IDMtMyAzek04IDEzaDIuNTV2M2gyLjl2LTNIMTZsLTQtNHpcIi8+PC9zdmc+JyksXG4gICAgICBjZShcIm9ubGluZS1pY29uXCIpLmh0bWwoJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjBcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwVjB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZmlsbD1cIndoaXRlXCIgZD1cIk0xMiA2YzIuNjIgMCA0Ljg4IDEuODYgNS4zOSA0LjQzbC4zIDEuNSAxLjUzLjExYzEuNTYuMSAyLjc4IDEuNDEgMi43OCAyLjk2IDAgMS42NS0xLjM1IDMtMyAzSDZjLTIuMjEgMC00LTEuNzktNC00IDAtMi4wNSAxLjUzLTMuNzYgMy41Ni0zLjk3bDEuMDctLjExLjUtLjk1QzguMDggNy4xNCA5Ljk0IDYgMTIgNm0wLTJDOS4xMSA0IDYuNiA1LjY0IDUuMzUgOC4wNCAyLjM0IDguMzYgMCAxMC45MSAwIDE0YzAgMy4zMSAyLjY5IDYgNiA2aDEzYzIuNzYgMCA1LTIuMjQgNS01IDAtMi42NC0yLjA1LTQuNzgtNC42NS00Ljk2QzE4LjY3IDYuNTkgMTUuNjQgNCAxMiA0elwiLz48L3N2Zz4nKSxcbiAgICApLFxuICAgIGNlKFwiaW5kZWNhdG9yLWRhc2hcIikudGV4dChcIi1cIiksXG4gICAgdGhpcy5vZmZsaW5lVGV4dEVsZW1cbiAgKVxuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5vbk9ubGluZVN0YXR1c0NoYW5nZSh0cnVlKVxuICAgIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsICgpID0+IHtcbiAgICAgIHRoaXMub25PbmxpbmVTdGF0dXNDaGFuZ2UoZmFsc2UpXG4gICAgfSlcblxuICAgIGxldCB2YWxpZFNlc3NSZXEgPSBhamF4LnBvc3QoXCJ2ZXJpZnlTZXNzaW9uXCIpXG4gICAgXG4gICAgXG4gICAgdmFsaWRTZXNzUmVxLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy52YWxpZCkge1xuICAgICAgICB0aGlzLm1hbmFnZXIuc2V0UGFuZWwoXCJpbmZvXCIsIFwibGVmdFwiKVxuICAgICAgICB0aGlzLm1hbmFnZXIuc2V0UGFuZWwoXCJlZHVcIiwgXCJyaWdodFwiKVxuICAgICAgICB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5lZHUuZXhwZWN0U3R1ZGVudCgpXG4gICAgICAgIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmVkdS5zdWJqZWN0ID0gcmVzLnN1YmplY3RcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguZWR1Lm1heEhvdXJzID0gcmVzLmhvdXJzXG4gICAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSB0aGlzLm1hbmFnZXIucGFuZWxJbmRleC5pbmZvLnVwZGF0ZUNvbnRlbnRzKFwiTGFiQXV0aFwiLCBcIllvdSBtYXkgc2lnbiBpbnRvIDx0ZXh0LWhpZ2h0bGlnaHQ+XCIgKyByZXMuc3ViamVjdCArIFwiPC90ZXh0LWhpZ2h0bGlnaHQ+IGhlcmUuIFRvIHNpZ24gb3V0LCByZWdpc3RlciB5b3VyIGNhcmQgYWdhaW4uXCIpXG4gICAgICAgIGVsc2UgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguaW5mby51cGRhdGVDb250ZW50cyhcIkxhYkF1dGhcIiwgXCJZb3UgbWF5IHNpZ24gaW50byA8dGV4dC1oaWdodGxpZ2h0PlwiICsgcmVzLnN1YmplY3QgKyBcIjwvdGV4dC1oaWdodGxpZ2h0PiBoZXJlLiBZb3VyIGNhcmQgd2lsbCBiZSBzeW5jZWQgd2hlbiBvbmxpbmUuXCIpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldFBhbmVsKFwiaW5mb1wiLCBcImxlZnRcIilcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldFBhbmVsKFwiZWR1XCIsIFwicmlnaHRcIilcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnBhbmVsSW5kZXguZWR1LmV4cGVjdFRlYWNoZXIoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB2YWxpZFNlc3NSZXEuZmFpbCgoKSA9PiB7XG4gICAgICB0aGlzLm1hbmFnZXIuc2V0UGFuZWwoXCJpbmZvXCIsIFwibGVmdFwiKVxuICAgICAgdGhpcy5tYW5hZ2VyLnNldFBhbmVsKFwiZWR1XCIsIFwicmlnaHRcIilcbiAgICAgIHRoaXMubWFuYWdlci5wYW5lbEluZGV4LmVkdS5leHBlY3RUZWFjaGVyKClcbiAgICB9KVxuXG4gICAgXG4gICAgXG5cbiAgICB0aGlzLmVsZW1lbnRCb2R5LmFwZCh0aGlzLm1hbmFnZXIsIHRoaXMub2ZmbGluZUluZGVjYXRvcilcblxuICAgIGlmICghbmF2aWdhdG9yLm9uTGluZSkge1xuICAgICAgdGhpcy5vbk9ubGluZVN0YXR1c0NoYW5nZShuYXZpZ2F0b3Iub25MaW5lKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgfVxuXG4gIFxuICBwcml2YXRlIG9uT25saW5lU3RhdHVzQ2hhbmdlKG9ubGluZTogYm9vbGVhbikge1xuICAgIGlmIChvbmxpbmUpIHtcbiAgICAgIHRoaXMuZGlzcGxheShcInN5bmNpbmdcIilcbiAgICAgIHRoaXMuZGlzcGxheShcIm9ubGluZVwiKVxuICAgIH1cbiAgICBlbHNlIHRoaXMuZGlzcGxheShcIm9mZmxpbmVcIilcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYWN0aXZhdGVJY29uKHN0YXR1czogXCJvZmZsaW5lXCIgfCBcIm9ubGluZVwiIHwgXCJzeW5jaW5nXCIpIHtcbiAgICBsZXQgcXVlcnlTZWxlY3RvciA9IHN0YXR1cyArIFwiLWljb25cIlxuICAgIGF3YWl0IHRoaXMuaWNvbkNvbnRhaW5lci5jaGlsZHMoKS5lYShhc3luYyAoaWNvbikgPT4ge1xuICAgICAgaWYgKGljb24ubWF0Y2hlcyhxdWVyeVNlbGVjdG9yKSkge1xuICAgICAgICBpY29uLnNob3coKVxuICAgICAgICBhd2FpdCBpY29uLmFuaW0oe29wYWNpdHk6IDF9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF3YWl0IGljb24uYW5pbSh7b3BhY2l0eTogMH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGljb24uaGlkZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0VGV4dChzdGF0dXM6IFwib2ZmbGluZVwiIHwgXCJvbmxpbmVcIiB8IFwic3luY2luZ1wiKSB7XG4gICAgaWYgKHRoaXMub2ZmbGluZVRleHRFbGVtLmNzcyhcIm9wYWNpdHlcIikgIT09IDApIGF3YWl0IHRoaXMub2ZmbGluZVRleHRFbGVtLmFuaW0oe29wYWNpdHk6IDB9KVxuICAgIHRoaXMub2ZmbGluZVRleHRFbGVtLnRleHQodGV4dEluZGV4W3N0YXR1c10pXG4gICAgYXdhaXQgdGhpcy5vZmZsaW5lVGV4dEVsZW0uYW5pbSh7b3BhY2l0eTogMSwgd2lkdGg6IHdpZHRoSW5kZXhbc3RhdHVzXX0pXG4gIH1cblxuICBwcml2YXRlIGN1cnJlbnRBbmltYXRpb25TdGF0dXM6IFwib2ZmbGluZVwiIHwgXCJvbmxpbmVcIiB8IFwic3luY2luZ1wiXG4gIHByaXZhdGUgY3VycmVudGx5SW5BbkFuaW1hdGlvbiA9IGZhbHNlXG4gIHByaXZhdGUgYXN5bmMgZGlzcGxheShzdGF0dXM6IFwib2ZmbGluZVwiIHwgXCJvbmxpbmVcIiB8IFwic3luY2luZ1wiKSB7XG4gICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uU3RhdHVzID0gc3RhdHVzXG4gICAgaWYgKHRoaXMuY3VycmVudGx5SW5BbkFuaW1hdGlvbikgcmV0dXJuXG4gICAgdGhpcy5jdXJyZW50bHlJbkFuQW5pbWF0aW9uID0gdHJ1ZVxuXG4gICAgXG4gICAgbGV0IHByb21zOiBQcm9taXNlPGFueT5bXSA9IFt0aGlzLmFjdGl2YXRlSWNvbihzdGF0dXMpLCB0aGlzLnNldFRleHQoc3RhdHVzKV1cbiAgICBcbiAgICBpZiAoc3RhdHVzID09PSBcIm9mZmxpbmVcIiB8fCBzdGF0dXMgPT09IFwic3luY2luZ1wiKSB7XG4gICAgICBwcm9tcy5hZGQodGhpcy5vZmZsaW5lSW5kZWNhdG9yLmFuaW0oe29wYWNpdHk6IDEsIGhlaWdodDogMzB9KSlcbiAgICAgIHByb21zLmFkZCh0aGlzLm1hbmFnZXIuYW5pbSh7aGVpZ2h0OiBcImNhbGMoMTAwJSAtIDMwcHgpXCJ9KSlcblxuICAgICAgaWYgKHN0YXR1cyA9PT0gXCJzeW5jaW5nXCIpIHtcbiAgICAgICAgcHJvbXMuYWRkKFByb21pc2UuYWxsKFtkZWxheSgzMDAwKSwgcmVjYWxsLnByb2Nlc3NdKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwcm9tcy5hZGQoZGVsYXkoMjAwMCkpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJvbmxpbmVcIikge1xuICAgICAgcHJvbXMuYWRkKGRlbGF5KDIwMDApLnRoZW4oKCkgPT4gdGhpcy5vZmZsaW5lSW5kZWNhdG9yLmFuaW0oe29wYWNpdHk6IDAsIGhlaWdodDogMH0pKSlcbiAgICAgIHByb21zLmFkZChkZWxheSgyMDAwKS50aGVuKCgpID0+IHRoaXMubWFuYWdlci5hbmltKHtoZWlnaHQ6IFwiMTAwJVwifSkpKVxuICAgICAgcHJvbXMuYWRkKGRlbGF5KDMwMDApKVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21zKVxuICAgIFxuXG5cbiAgICB0aGlzLmN1cnJlbnRseUluQW5BbmltYXRpb24gPSBmYWxzZVxuICAgIGlmIChzdGF0dXMgIT09IHRoaXMuY3VycmVudEFuaW1hdGlvblN0YXR1cykgYXdhaXQgdGhpcy5kaXNwbGF5KHRoaXMuY3VycmVudEFuaW1hdGlvblN0YXR1cylcbiAgfVxuXG4gIHN0bCgpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vc2l0ZS5jc3NcIikudG9TdHJpbmcoKVxuICB9XG4gIHB1ZygpIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vc2l0ZS5wdWdcIikuZGVmYXVsdFxuICB9XG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2Mtc2l0ZScsIFNpdGUpOyIsImltcG9ydCBhamFvbiBmcm9tIFwiYWphb25cIlxuXG5leHBvcnQgZGVmYXVsdCBhamFvbih1bmRlZmluZWQsIFwic2Vzc0tleVwiKVxuIiwiaW1wb3J0IHsgVGVsIH0gZnJvbSBcImV4dGVuZGVkLWRvbVwiXG5cbmxldCBzdWJzY3JpcHRpb24gPSBbXVxuXG5sZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbmxldCBoaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhpZGUtaW5wdXRcIilcblxuaW5wdXQuY3NzKHtcbiAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwXG59KVxuXG5oaWRlLmNzcyh7XG4gIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgd2lkdGg6IDIwMCxcbiAgaGVpZ2h0OiAyMDAsXG4gIGJhY2tncm91bmQ6IFwid2hpdGVcIlxufSlcblxuXG5sZXQgZGlzYWJsZWQgPSAwXG5cblxuLy9AdHMtaWdub3JlXG5kb2N1bWVudC5ib2R5LmFwcGVuZChpbnB1dCwgaGlkZSlcbmlucHV0LmZvY3VzKClcblxubGV0IGJsdXJMaXN0ZW5lcjogVGVsID0gaW5wdXQubHMoXCJibHVyXCIsICgpID0+IHtcbiAgaW5wdXQuZm9jdXMoKTtcbn0pO1xuXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBhc3luYyAoZSkgPT4ge1xuICBpZihlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgbGV0IHZhbCA9IGlucHV0LnZhbHVlXG4gICAgaW5wdXQudmFsdWUgPSBcIlwiXG4gICAgaWYgKGlucHV0LnRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgZGlzYWJsZSgpXG4gICAgICBsZXQgcHJvbXMgPSBbXVxuICAgICAgc3Vic2NyaXB0aW9uLmZvckVhY2goKGYpID0+IHtcbiAgICAgICAgcHJvbXMuYWRkKGYodmFsKSlcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9tcylcbiAgICAgIGVuYWJsZSgpXG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGYpIHtcbiAgc3Vic2NyaXB0aW9uLnB1c2goZilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGYpIHtcbiAgY29uc3QgaW5kZXggPSBzdWJzY3JpcHRpb24uaW5kZXhPZihmKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBzdWJzY3JpcHRpb24uc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZGlzYWJsZWQrKztcbiAgdXBkYXRlU3RhdGUoKVxufVxuXG5kaXNhYmxlKClcblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgaWYgKGRpc2FibGVkICE9PSAwKSBkaXNhYmxlZC0tO1xuICB1cGRhdGVTdGF0ZSgpXG59XG5cblxuZnVuY3Rpb24gdXBkYXRlU3RhdGUoKSB7XG4gIGlmIChkaXNhYmxlZCA9PT0gMCkge1xuICAgIGlucHV0LnRhYkluZGV4ID0gMFxuICAgIGJsdXJMaXN0ZW5lci5lbmFibGUoKVxuICAgIGlucHV0LmZvY3VzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpbnB1dC50YWJJbmRleCA9IC0xXG4gICAgYmx1ckxpc3RlbmVyLmRpc2FibGUoKVxuICB9XG59XG4iLCJjb25zdCBsYW5nID0gcmVxdWlyZShcIi4vLi4vLi4vcmVzL2xhbmcvZ2VyLmpzb25cIilcblxuY29uc3QgYnJhY2tldE9wZW4gPSBcIltcIjtcbmNvbnN0IGJyYWNrZXRDbG9zZSA9IFwiXVwiO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUhUTUxXaXRoTGFuZyhodG1sOiBzdHJpbmcpIHtcbiAgbGV0IGludGVyID0gXCJcIjtcblxuICBsZXQgb3BlbkluZGV4OiBudW1iZXI7XG4gIGxldCBjbG9zZUluZGV4OiBudW1iZXI7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgb3BlbkluZGV4ID0gaHRtbC5pbmRleE9mKGJyYWNrZXRPcGVuKTtcbiAgICBjbG9zZUluZGV4ID0gaHRtbC5pbmRleE9mKGJyYWNrZXRDbG9zZSk7XG4gICAgaWYgKG9wZW5JbmRleCAhPT0gLTEpIHtcbiAgICAgIGludGVyICs9IGh0bWwuc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIGludGVyICs9IHJlc29sdmVMYW5nKGh0bWwuc3Vic3RyaW5nKG9wZW5JbmRleCArIDEsIGNsb3NlSW5kZXgpKTtcbiAgICAgIGh0bWwgPSBodG1sLnN1YnN0cihjbG9zZUluZGV4ICsgMSk7XG4gICAgfSBlbHNlIGJyZWFrO1xuICB9XG5cbiAgaW50ZXIgKz0gaHRtbDtcblxuICByZXR1cm4gaW50ZXI7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVMYW5nKGtleTogc3RyaW5nKSB7XG4gIGxldCBsID0gbGFuZ1xuICBrZXkuc3BsaXQoXCIuXCIpLmVhKChlKSA9PiB7XG4gICAgbCA9IGxbZV1cbiAgICBpZiAobCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGdldCBrZXkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGZyb20gbGFuZy5cIilcbiAgICAgIGwgPSBrZXlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGwgYXMgc3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGludGVycG9sYXRlSFRNTFdpdGhMYW5nXG4iLCJpbXBvcnQgU2l0ZSBmcm9tIFwiLi9fZWxlbWVudC9zaXRlL3NpdGVcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgbGV0IHNpdGUgPSBuZXcgU2l0ZSgpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoc2l0ZSlcbn0iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiOmhvc3Qge1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyIC40cywgY29sb3IgLjRzO1xcbn1cXG5cXG5idXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMCVcXG59XFxuYnV0dG9uLXRleHQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIG1hcmdpbjogYXV0byAwO1xcbiAgcGFkZGluZzogMCAyMHB4O1xcbn1cXG5cXG46aG9zdCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4yNCk7XFxufVxcblxcbjpob3N0KDpub3QoLmVuYWJsZWQpKSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xNCk7XFxuICBjb2xvcjogcmdiKDE5MSwgMTkxLCAxOTEpXFxufVxcblxcbjpob3N0KDpub3QoLmVuYWJsZWQpKSBsb2FkaW5nLXNwaW5uZXIge1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTkxLCAxOTEsIDE5MSk7XFxuICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuOmhvc3QoOmZvY3VzKSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC42KTtcXG59XFxuXFxubG9hZGluZy1zcGlubmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogOHB4O1xcbiAgd2lkdGg6IDhweDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogMTRweDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSB0cmFuc2xhdGVYKC01MCUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcblxcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCByZ2IoODIsIDgyLCA4Mik7XFxuICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogLjRzIGJvcmRlci1jb2xvcjtcXG5cXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcblxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiOmhvc3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuYnV0dG9uLXdhdmUge1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gIGhlaWdodDogMjVweDtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG59XFxuXFxuYnV0dG9uLXdhdmUge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuMSk7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiOmhvc3Qge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCI6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcblxcblxcbmVsZW1lbnQtYm9keSB7XFxuICBvdmVyZmxvdy14OiBhdXRvO1xcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XFxufVxcblxcbmJsYWNrLWJhciB7XFxuICBiYWNrZ3JvdW5kOiBoc2woMCwgMCUsIDkwJSk7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGxlZnQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbmxpc3QtY29uYXRpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogY2FsYygxMDAlICsgNTBweCk7XFxuICBiYWNrZ3JvdW5kOiBoc2woMCwgMCUsIDk3JSk7XFxuICBzY3JvbGwtc25hcC1hbGlnbjogc3RhcnQ7XFxufVxcblxcbm1haW4tY29uYXRpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcXG59XFxuXFxuXFxuc2Nyb2xsLWNvbmF0aW5lciB7XFxuICBcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG5cXG4gIFxcblxcbiAgb3ZlcmZsb3cteTogYXV0bztcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5zY3JvbGwtY29uYXRpbmVyLmNhcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuc2Nyb2xsLWNvbmF0aW5lci50YWJsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmMtZWR1IHtcXG4gIHpvb206IC43NztcXG4gIG1hcmdpbjogMTVweCAwO1xcbn1cXG5cXG5ob3Vycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoODVweCk7XFxufVxcblxcbmxvYWRpbmctYmFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNzVweCk7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgbWFyZ2luLXRvcDogOHB4O1xcblxcbiAgYmFja2dyb3VuZDogI0Q5RDlEOTtcXG5cXG4gIHdpZHRoOiAxMjVweDtcXG4gIGhlaWdodDogNnB4O1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxubG9hZGluZy1wcm9ncmVzcyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuXFxuICBiYWNrZ3JvdW5kOiAjMzNBRkYzO1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggcmdiYSg1MSwgMTc1LCAyNDMsIDAuNjEpO1xcbn1cXG5cXG5cXG5ob3VyLWJveCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQ6ICNEOUQ5RDk7XFxuICBtYXJnaW46IDAgMnB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3BhY2l0eTogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuaG91ci1ib3guYWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6ICM3OUM4NjU7XFxufVxcblxcbmhvdXItYm94LnRvQmVHb25lIHtcXG4gIGJhY2tncm91bmQ6ICNCN0QzQjA7XFxufVxcblxcbiNhcnJvdyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDIwcHg7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxub3RoZXItY2FyZHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMjVweCk7XFxufVxcblxcbm90aGVyLWNhcmRzLWNvbnRhaW5lcjpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XFxufVxcblxcbiNtYWluQ2FyZCB7XFxuICBtYXJnaW4tdG9wOiAxODNweDtcXG59XFxuXFxuYy1ibG9jay1idXR0b24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAyMHB4O1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXFxuYy1ibG9jay1idXR0b24jY2FuYyB7XFxuICBsZWZ0OiAyMHB4XFxufVxcblxcbmMtYmxvY2stYnV0dG9uI2NvbmYge1xcbiAgcmlnaHQ6IDIwcHhcXG59XFxuXFxuXFxudGFibGUtcm9vdCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMmZyO1xcbiAgd2lkdGg6IDgwJTtcXG4gIHJvdy1nYXA6IDIwcHg7XFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG59XFxuXFxudGFibGUtY29sIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZWxlbWVudC1ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG50ZXh0LWNvbmF0aW5lciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMjEwcHg7XFxuICBtYXJnaW4tbGVmdDogNTBweDtcXG59XFxuXFxudGV4dC1oZWFkaW5nIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAycHg7XFxuICBmb250LXNpemU6IDQ1cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1pbi1oZWlnaHQ6IDU3LjVweDtcXG59XFxuXFxudGV4dC1wYXJhZ3JhcGgge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMjNweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWluLWhlaWdodDogNjlweDtcXG59XFxuXFxuYm90dG9tLXN0cmlwZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAzcHg7XFxuICB3aWR0aDogNDBweDtcXG4gIGJhY2tncm91bmQ6ICMzQjNCM0I7XFxufVxcblxcbnRleHQtaGlnaHRsaWdodCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJlbGVtZW50LWJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbnRleHQtY29uYXRpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAyMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xcbn1cXG5cXG50ZXh0LWhlYWRpbmcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogNDVweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWFyZ2luLWJvdHRvbTogMjIuNXB4O1xcbn1cXG5cXG5jLWlucHV0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogOXB4IDA7XFxufVxcblxcbmMtaW5wdXQ6Zmlyc3Qtb2YtdHlwZSB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbn1cXG5cXG5jLWlucHV0Omxhc3Qtb2YtdHlwZSB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIjpob3N0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZWxlbWVudC1ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxufVxcblxcbnRleHQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXG59XFxuXFxudGV4dC1oZWFkaW5nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAzNXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcblxcbnRleHQtY29udGVudCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMjA5cHg7XFxufVxcblxcbi5oaWdodGxpZ2h0IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWluLXdpZHRoOiA0N3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcXG59XFxuXFxuYy1ibG9jay1idXR0b24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG5cXG5jLWJsb2NrLWJ1dHRvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDIwcHg7XFxufVxcblxcbmMtYmxvY2stYnV0dG9uLmFib3J0IHtcXG4gIGxlZnQ6IDIwcHhcXG59XFxuXFxuYy1ibG9jay1idXR0b24uY29uZmlybSB7XFxuICByaWdodDogMjBweFxcbn1cXG5cXG5cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImVsZW1lbnQtYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxudGV4dC1oZWFkaW5nIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDQ1cHg7XFxuICBtYXJnaW4tYm90dG9tOiA3cHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTMycHgpO1xcbn1cXG5cXG50ZXh0LWNvbmF0aW5lciAge1xcbiAgbWFyZ2luLWxlZnQ6IDcwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxufVxcblxcbmMtc2V0dXAtaW5wdXQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5xdWVzdGlvbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMjYwcHg7XFxuICBtaW4taGVpZ2h0OiAxMDAuNXB4O1xcbn1cXG5cXG4jYmFjayB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi10b3A6IDEzcHg7XFxuICBtYXJnaW4tbGVmdDogNnB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTBweCk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IHJlcXVpcmUoXCIuL3Vua25vd25BdmF0YXJEZXB0aC5zdmdcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSByZXF1aXJlKFwiLi9hdXN0cmlhLnBuZ1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIjpob3N0IHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDQyN3B4O1xcbiAgaGVpZ2h0OiAyNTdweDtcXG59XFxuXFxuI2VkdS5iaWcge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyNSk7XFxuICBib3gtc2hhZG93OiA0cHggNHB4IDVweCAwICMzYTM5MzkyMTtcXG59XFxuXFxuXFxuI2VkdSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNXMsIGJveC1zaGFkb3cgLjVzO1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggMCAjMDAwMDAwNDI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogNDI3cHg7XFxuICBoZWlnaHQ6IDI1N3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjZWViMTRkIDAlLCAjZTg5YTE2IDEwMCUpO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG5cXG4jZWR1LXRlYWNoZXIge1xcbiAgb3BhY2l0eTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzRkZDhlZSAwJSwgIzRkOThlZSAxMDAlKVxcbn1cXG5cXG5cXG4uUmVjdGFuZ2xlXzJfaiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIHdpZHRoOiA0MjdweDtcXG4gIGhlaWdodDogMjU3cHg7XFxuICBsZWZ0OiAwcHg7XFxuICB0b3A6IDBweDtcXG59XFxuI2VkdV9jYXJkIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDE5cHg7XFxuICB0b3A6IDdweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgd2lkdGg6IDEzNXB4O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBmb250LWZhbWlseTogT3ZlcnBhc3M7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMzNweDtcXG59XFxuI3RnbV9fX0hUQkx1VkFfV2llbl9YWF8xMjAwX1dpZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAyMHB4O1xcbiAgdG9wOiA0N3B4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICB3aWR0aDogMTY1cHg7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtZmFtaWx5OiBPdmVycGFzcztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEzcHg7XFxufVxcblxcbiNmdWxsTmFtZUNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAxOXB4O1xcbiAgdG9wOiA5MHB4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICB3aWR0aDogMTQzcHg7XFxuICBoZWlnaHQ6IDE0cHg7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtZmFtaWx5OiBPdmVycGFzcztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4jbW92ZUZ1bGxOYW1lIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuI01heGltaWxpYW5fTWFpcmluZ2VyIHtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDBcXG59XFxuXFxuXFxuI0Z1bGxuYW1lT3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsZWZ0OiAxMDFweDtcXG4gIHRvcDogMDtcXG4gIGhlaWdodDogMjBweDtcXG4gIG9wYWNpdHk6IDA7XFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcbiNGdWxsbmFtZU92ZXJsYXlHcmFkaWVudCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA1cHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYmEoODMsIDgwLCA3NCwgMCksIHJnYmEoMjM2LCAxNjgsIDU2LCAxKSk7XFxufVxcbiNGdWxsbmFtZU92ZXJsYXlTb2xpZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAyMHB4OyAgXFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjM2LCAxNjgsIDU2KVxcbn1cXG5cXG4jbG9hZGluZ1NwaW5uZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA2cHg7XFxuICB3aWR0aDogNnB4O1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA3LjVweDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSB0cmFuc2xhdGVYKC01MCUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcblxcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcblxcblxcbmltZy11c2VyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiA5MHB4O1xcbiAgaGVpZ2h0OiAxMjRweDtcXG4gIGxlZnQ6IDE5cHg7XFxuICB0b3A6IDExM3B4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuI1VzZXJuYW1lX19tbWFpcmluZ2VyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDEyNnB4O1xcbiAgdG9wOiAxMThweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgd2lkdGg6IDEzMXB4O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBmb250LWZhbWlseTogT3ZlcnBhc3M7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbn1cXG4jR2VidXJ0c2RhdHVtX18yOV8yXzIwMDAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTI3cHg7XFxuICB0b3A6IDE0MnB4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICB3aWR0aDogMTQ0cHg7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtZmFtaWx5OiBPdmVycGFzcztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEzcHg7XFxufVxcbiNHX2x0aWdfYmlzX18yOV8wOF8yMDMwIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDEyN3B4O1xcbiAgdG9wOiAxNTlweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgd2lkdGg6IDEyNHB4O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBmb250LWZhbWlseTogT3ZlcnBhc3M7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbn1cXG4jV29obm9ydF8ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTI1cHg7XFxuICB0b3A6IDIwM3B4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICB3aWR0aDogNTRweDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgZm9udC1mYW1pbHk6IE92ZXJwYXNzO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG59XFxuI0lEMjQyNF9XaWVuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDEyNXB4O1xcbiAgdG9wOiAyMjBweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgd2lkdGg6IDYycHg7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtZmFtaWx5OiBPdmVycGFzcztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEzcHg7XFxufVxcbmltZy1hdXN0cmlhIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiA2NXB4O1xcbiAgaGVpZ2h0OiA2OHB4O1xcbiAgbGVmdDogMzAwcHg7XFxuICB0b3A6IDE3cHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuI3N0cmlwZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMjU3cHg7XFxuICBsZWZ0OiAzOTVweDtcXG4gIHRvcDogMHB4O1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoI2NmY2ZjZiAwJSwgI2EyYTZiMSAxMDAlKTtcXG59XFxuXFxuLmVkdS1jb250YWluZXItc2lkZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgei1pbmRleDogMTAwO1xcbn1cXG5cXG4uZWR1LWNhcmQtc2lkZSB7XFxuICBtYXJnaW46IDIwcHggMDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHRyYW5zbGF0ZVkoLTFweCk7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAxMi41cHggMDtcXG59XFxuXFxuLmVkdS1jYXJkLXNpZGUuYiB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpIHRyYW5zbGF0ZVgoLTI3cHgpIHRyYW5zbGF0ZVkoLTFweCk7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiAyLjVweCAwO1xcbn1cXG5cXG4uZWR1LWNhcmQtc2lkZTpudGgtY2hpbGQoMSkge1xcbiAgY29sb3I6ICM5OEU0RTQ7XFxufVxcblxcbi5lZHUtY2FyZC1zaWRlOm50aC1jaGlsZCgyKSB7XFxuICBjb2xvcjogIzlERTFDMztcXG59XFxuXFxuLmVkdS1jYXJkLXNpZGU6bnRoLWNoaWxkKDMpIHtcXG4gIGNvbG9yOiAjQUNERjlFO1xcbn1cXG5cXG4uZWR1LWNhcmQtc2lkZTpudGgtY2hpbGQoNCkge1xcbiAgY29sb3I6ICNDQkQ1QTQ7XFxufVxcblxcbi5lZHUtY2FyZC1zaWRlOm50aC1jaGlsZCg1KSB7XFxuICBjb2xvcjogI0RBQjVBMztcXG59XFxuXFxuI1VzZXJuYW1lX19tbWFpcmluZ2VyIHNwYW4ge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICB3aWR0aDogNHB4O1xcbiAgaGVpZ2h0OiA0cHg7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbjpob3N0KDpmb2N1cyl7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4qOmZvY3Vze1xcbiAgb3V0bGluZTpub25lO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lciB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDApO1xcbn1cXG5cXG46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbn1cXG5cXG5lbGVtZW50LWJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29sb3I6IHJnYig1OSwgNTksIDU5KTtcXG4gIHRyYW5zaXRpb246IC4zcyBjb2xvcjtcXG4gIGxldHRlci1zcGFjaW5nOiAuNXB4O1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIjpob3N0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAzOHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBjdXJzb3I6IHRleHQ7XFxufVxcbmlucHV0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDEwcHggMTNweDtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGZvbnQtc2l6ZTogLjllbTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAuM3MsIGJvcmRlciAuM3MsIG9wYWNpdHkgLjNzO1xcbn1cXG5pbnB1dC1wbGFjZWhvbGRlciB7XFxuICB6LWluZGV4OiAyO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbWFyZ2luOiAxMHB4IDEzcHg7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgLjNzLCBvcGFjaXR5IC4zcztcXG5cXG4gIHVzZXItc2VsZWN0OiBub25lXFxufVxcblxcbi5pbnZhbGlkIHtcXG4gIGNvbG9yOiByZWQ7XFxuICBib3JkZXItY29sb3I6IHJlZDtcXG59XFxuXFxuLmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IC4zO1xcbn1cXG5cXG5pbnB1dCB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwuMSk7XFxufVxcblxcbjpob3N0KDpmb2N1cy13aXRoaW4pIGlucHV0Om5vdCguaW52YWxpZCkge1xcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcXG59XFxuXFxuXFxuaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZWxlbWVudC1ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxubGVmdC1jb250YWluZXIge1xcbiAgd2lkdGg6IDQxLjI1JTtcXG59XFxuXFxubGVmdC1jb250YWluZXIgPiAqIHtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTVweCk7XFxufVxcblxcbnJpZ2h0LWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICB3aWR0aDogYXV0bztcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMyUpO1xcbn1cXG5cXG5yaWdodC1jb250YWluZXIgPiAqIHtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTVweCk7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZWxlbWVudC1ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG50ZXh0LWNvbmF0aW5lciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbnRleHQtaGVhZGluZyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xcbiAgZm9udC1zaXplOiA0NXB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbnRleHQtcGFyYWdyYXBoIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIzcHg7XFxufVxcblxcbmMtaW5wdXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuXFxuaGlnaGxpZ2h0LXRleHQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vcmVzL2ZvbnQvb3ZlcnBhc3Mud29mZjJcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImVsZW1lbnQtYm9keSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdPdmVycGFzcyc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKTtcXG4gIHVuaWNvZGUtcmFuZ2U6IFUrMDAwMC0wMEZGLCBVKzAxMzEsIFUrMDE1Mi0wMTUzLCBVKzAyQkItMDJCQywgVSswMkM2LCBVKzAyREEsIFUrMDJEQywgVSsyMDAwLTIwNkYsIFUrMjA3NCwgVSsyMEFDLCBVKzIxMjIsIFUrMjE5MSwgVSsyMTkzLCBVKzIyMTIsIFUrMjIxNSwgVStGRUZGLCBVK0ZGRkQ7XFxufVxcblxcbm9mZmxpbmUtaW5kZWNhdG9yIHtcXG4gIGhlaWdodDogMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZDogIzFmN2VlYTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBvcGFjaXR5OiAwO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbm9mZmxpbmUtaW5kZWNhdG9yID4gaW5kZWNhdG9yLWljb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcblxcbm9mZmxpbmUtaW5kZWNhdG9yID4gaW5kZWNhdG9yLWljb24gPiAqIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG5vZmZsaW5lLWluZGVjYXRvciA+IGluZGVjYXRvci1kYXNoIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcblxcbiAgbWFyZ2luOiAwIDVweDtcXG59XFxuXFxub2ZmbGluZS1pbmRlY2F0b3IgPiBpbmRlY2F0b3ItdGV4dCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMXB4KTtcXG4gIG9wYWNpdHk6IDA7XFxuICB3aWR0aDogNTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbmMtcGFuZWwtbWFuYWdlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCJkYXRhOmZvbnQvd29mZjI7YmFzZTY0LGQwOUdNZ0FCQUFBQUFFN2tBQkVBQUFBQXpZUUFBRTZCQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFHam9ieFVJY2hrNEdZQUNEY0FnOENab0hFUWdLZ3BNMGdlOWJDNE55QUFFMkFpUURoMkFFSUFXRkRnZUdWUXlCRFJ1SnVEWEt0aytVeU8wQTkzRy91TmxJaExCeFFBakVuRmwwSVBZNEFPa2JzUGovejBtUU1jYTJWMjhJV0ZwWk9WaGFHZ1lSeFI2bHdIckduTjMyaVVYbzBFT3RlVVN3SjU1VG83aGFTYTlTWndFbG8zN05LZnd0aE1keDZvK2FzbzN6czluYnY5NnpoRmZxR0VLc0hBWC9KU3RCQlkxVjRzZVhvNGpkZU5ORjkxdi9hbXFNTFYxK2JHNFZVSTdOcVpHc25EejUyaE9iOXZOMkZ3SkU5VkthVkVSU3o1bFh2N3VlbXpOQWMvb1BCVDlnU0VzZ0NTUjRuTVFoZm5jeHZZUmNFaVJHTUFzRXM3WnZaVkNUVDdmVm9DN1F6cVJ2RlozbzMydm4xZ0cwSXp4VS9FYjBzZCsvOVp6N0Fnd1dWS0lJMGNoVVhDckdaUkhLcjF4SkxBemJmMVJHTTh2VFZCaXNuTHlZZ3dIYnVnRnZKWGdLRXBLYStmOWZ6dkxlbDM2b1FCY2dVS0ZXVHdoeE5TdWZnMXhDem5MR05RblJTNmZsaEZUZjRBUnFZejFHMTYyQXZrejA1YjcrMnNiRU1FMG1tOG1vSWgreElKYVRJa1Y2RXZwZVQwSlBnSkQ1dmg0Z1JIbjhWdVZlaHRWT3NtV1laSSsyZmxhVTRHbm04ZkFWeEw0c2xqMEJ2L01FVGM2S21xSk9WMDBXTDREL1FUZVJJTnFXbUdNSk5qZitIZC9sVmk2WFVLcXEvZWJ5RDdmRzdjUUlla0laRDBhaW9LNUtNaVpzQ0E3UlFvNmZXdmZlcnZ5am5PYU1aQmRtdkllTUM3WTM1T1R1bkRKYjdVLzZIZ0lrTEZsRitEeUs2bGdaVnhkV0pVQVA3TExOZ1N2eE9Na0RMTHJ2bS9mL1h6cjd0dTlWU1ViR1AxRHRubit3SjVualR5ZFB5R3NhaDRsaEYvTzZkTjhydlZLOUtrbVVDaXNCQTRKMll6QnVrSXdiVEFlcVN1QlNDZHcwMkgxcytEa3dLV1BoZ0VNSCtDbWsxYVFZRnNzUWw3MWNUZ3FyV1d3M1E3UzY4WUJXTUR3QURpaWtWMzRNL245dWZMMHNuUWMzeEtBRHdRMkRjU3hwTXhpa1c1cTVXcXkvdE8vTHZYMC9JU2hkejAxVkpjeDgvTDUxWjVraHo3YnVPTVpSSENHRUVVSVlKMWZxYithSzc2VDU5UFpOZW1MTHZMTVNTZ2lQa01raW02SlQ2eUJBNnFteS9mNnpuMXBwakcxdjVXYUdPeWdnOHdFUEpEYmZ0MHpuYUdkMlZkU0FoTHlJUVFBTElBWmdPRzRMc3RVMnpIWm5FUVhqNEVCWThhVkRCRXAva1FCTm1qSnM5OTUrclVoNWZPT1IrNUJDQURCWWloN2RlZWcreEROdzBQVExsWWRsMy9XMWpFTjZpQVpFM2FmUGlOVmU4WjV2L0dhVUNhWlo0SlFMaVNBMG1RTEpEelA4aUtQS29GeVhlL0pjM3NsMytRTWpjM0VCUENKSWd3WW9tblhXTWR2dEVJc2p6dkpnNmlkY1A0SDRVOXpBbU5EUVNJUHpHbWlPRmpGaHNiei9wbUFwSkk1d1VXcHlTNHZWdVJYTnJtQjN2ejNkOW9xOSswN1ozeDk5NElHRDJTSFQzc05GUW9oNEpHNklZdzdLdmN3ZlBtMzg1MmdSUjFBd2JGN3UyWUhXRHZJaW5Dd2IxalZnR2NlSnBzZ2d4WHpzdk5OOTJkbStlS29CTGhCdHgvcEtmbndOUHNVUG91NnN4TSs5eHFrKzZ6UXZSZ204dUpMSExGdXBRZzlST0JobmVqUUlzM21iQk04OHRYWk9peXkyeEZMTExFY1drWkFQWU52Q0RvazRKYkpJWXBaSVpLbkVMQWY4dnk4S0U0OWJwajR5ZjU1L2tudWN6d0hpSVFDU21EdzFrblFpU2JMMVpvYzZqL203MGVoRzNNLzliM1NIcmFWZytpdXdVeHdaeGtRYVVua05td1FDMUl0ZHcxWU5HRVRxcC80RDN6NDFSN1A4NFY4NWRUNkZ3ZVZXb2s0R3I3am9mOG9rUGxqVkJENE9BWWhCQUVsVkJTZU1oMklMQU5Nd2RYYXNKdm5EM2VrU01Cb2F5WTF4Y2lZbzJGVmV3dERkQ2ZLRGRrcmFhOEZJT0pNbkx2MEU2Q2tUWmlMTUtFMzJyYXlOZXhLMFNRTk9Ya0ZqYUlWZS9OUXRhU1pzNDRWdTF3cEl3bUlvVkRLdWRWVlpEenBQNjNCMFVncVk5SENqTUNXQmFWcDZNMTRqRDFrT09SZmZPT1p0NmFUd3VmbHQ4bStVZS9JM1gxSGNCUmliQllhS3YvU0hFeGdNcXBtRkpSRjNRMG11b0Nrb1FGK1JIREpoVkRCOUd1a0NpbENJdlNab1d1NGV4andaREJ4Y0F3aEdvMXNpL3VZQ01WVkhsV1lsR0R3S3hJS1Q3RWlNSHZLR3Y5bE9zSytkOC9wVGgxcmd5SW5SYU5XOUxFL2NhZHYvb2NJQlZsSjNlTmd2Tm9jeUE2STJqZTFZQXFNN3MwTy82VVVTNGN6Y0hhMGprUTFCNU1kamhMSzQrMVFaeERFL1VKTnAwYldPY3JnUERxZ1UzYTRZMXJnYnVmN0ZIK241Q1kybWxERmdKTFVFU2ZCUkdQdjNBSjZUUXFxZWR3bHE1TjdOVXpSYUZiYnpnV0dFR2plQkFibHpsWFhSRXdOM1hCekZYblIwLzhjQlhTcStIUW14d2V6eEcrQXNRZFBzc0xtSm1ZVGx4cUFnZjJMVzU5SHdZVHRUMDhkSTFON1d6REFlVDVWeHQ1dnlZU28zMkJDT29SaW1NcVFrQnNHMDcrbHdkMVpOc0VNUi9PbEV0RTl2KytBRXA1NmdwbVpjYjJkMXFDQ1djWXpUMjFkQVNyejF4NDRUUEtTL3JFUjRidU9KWER5ZmovNk1RSE4zRkhpRitiMUVNMzJzQ01qRlh0NStqQ3BOSGVEdUFPdUJDK2NsWDRqNHl2ZEt6WVJxczlWWXI5YU9uc0JrU2tjeU1KazBXYmhzUWs1S2N1V1I1VE1wb0NoTVZaRmlzaEthVW1abE5PVXNLbGhWc3FsaVY4Mmxoa010cHdTWHVuRzNVSW1iNkEzQ3ZYa3hiM2tYOTU0UHlUNEN6Y2NwKzhRWE5GK2w1bXZmc2Z2ZVNMaXJaVkVWdWNqT1prSzQ3VUlBa2gyZWRUOEhJRjJGZEpraXZMS1VLZUVXRk9EaWFZcmUra3R4YVhSZlNTanBZQ2lyUkUrVklKR3BUQlNxYklEVExkUU5UMWszYUZKQU1nTXVNRkxDaFdJczRteXNjdGxVbytiTU1JVTRJNW95YUVTZUFwZkJKNGMzYmYwNVZlTG9jb0R3Um9DVHVZcng1a0ZqTnltS2d2bVhGeWxVQk0xbWlzWDNobUpWd0F1b0RONDhoMU1HZEtuUzQ4ak5pQXJIWVFwUHVrWURNR1pzd2pPaXdmUm00aGZjc0VvRUw5cytmaUlLdWFERmdQNy9tTVJ0RFFEamxxTDVkeWNXVXNhVWlkQjV2d0JFVkpCQk5LRkhvZWJ3eHJ1cFhXU3dDSUpQRVlsSk16dEZwb0Z1RjN2aUFlZnpxQ1poVDBNQ0VMKzkvNm9WQkNqdEo0bS9ucHBTdU0yRE92QTlXaU5SdUdoS3hGQ2xxZVplUG13L3ZPeXFUUW9DWXpRQWlUbjJmRm41S0RoRElMU1luUXZGY2JVRHU2ajlweFUxU0xhc2pNZThhZW9BaXV5R2FkR1R4TThwSXJ0bS9wWVVGOHhYanNLVzRaVER0U3BGazcxTW5PbSt5a0lta0EyMkpZSnFZQ3NpREE0Wk0rUHA5d2MxQzNaUmZOVTRneGxPQVdhbnFIa01ESSs0K2JYanJjdjd4SDBNYnlTYmY3a2lTZm51cTRSWkREeDlWaHBsWEJhMnpBUEI1UktCak1JYjYvT3ZkMFRLbG05aEJQSlpqYkM5YzJMczNSYzd2U2pUWCs0OS9XK1RNVWt5aU1BQTFSSThwbGUySDQwVE5zRU1wZWFZSTJHcjdlb3dtYnBUaXRlRHlnbzlxVVhwUlNOYWIxb3grdEJKMW85QmxBRk00Z3hrRm1VSW0zaXQ3SksxcVpDb25RT2dBeXBKSjZka1hWeFNYY1h0S1ZlckZPY2FWVkpkcTFxNng0UkZlbHl2WkQvNmtkbFBma2YrOEFmaFQzOWkvdkl2NFQvRHlVWVlRVFhTU0dTVWNWUVRUS0NZYUFxYnFhWnltbVlheFhUVE9jMHdnL1dVUlRHY0k2cU5xQ2JGcFR5dlBnNCtIbm1BSXJtS1pjbWh5cFROeXd0bVBGM1RjSG9jdlk0Q0dHVXptRGdIb1JNNVhkNzZMUXFGNm9aVUlZVmN0S01CTWtMdlA0SzdjWEl4a2JtWlJOaW4xNWFRaU1kbUZSQlRRRTkrVGRkekN6WHBOaHJteHhleWhrYUxrSERRZjNsWVVQZ0RBeUZSTGxIWVJnNEk5T0xwZUI5MVlDQkM0bXRIb21GTEhHczBQT21wVWhVcUlEQkowWUIrN0Zhd3FndWZrb3FvcXRPNkxldzZ5STg3S1BxN1A0cW1jckpqUE00R1RtTThCTnVjTGc5bndNdTVLZUxDRG5IWkNJbVNLQmViOUtBUlh4cVplUDBoSlJsQ3k0SEhzNThuOHI0WThKTFhrZTNoTXFkRlJWZlpiT2R4ZEJLNHhsZXUyS0VNczlPdHpZSU52eEhBZnhzOUlrMFlBRzAzM0NiTjFFNU9CZXRLSzBWdUtIdnRtS2F0Sld2U1BjMmtzU21uVjFzaGdJeHhxb2hhRlkxb0U4U2VTbmpOL1E1TmNEOU1ZOXE3RitqSDlQUzZOUnlvQVlTZmxIZmlGSG15Zzh1ZEI4V0g2aWpwekZQSEE5eFg2dG5RVTVjZGJNSHBjamViS0NtNXc3M3ViZWdScVk5eTVJTWV0MDhpTzhkaVVKcGpzMElwZUM5TEZaSERNT3FjZ2VFZUdrQ0RPNjV4TVR1L2hBeHVIOG1FQm9rQlhzTFdYUzdreE9OdjNoeUtoSmxaMlRrNHVYUVRWYTlCSTBpTmdGYkR4aTJ3OEs3ZTZEWFdZZ0xNRUsyR0thZ08ya1J3U3NRbDJkVkxtZ1pKMFNnQm1xVlUxMGtKYnBhUzNDdXQ4S3dVNVVWdTJ5OFhkd2N6a3NYT0s5OGp6RWlXa1NSYkxwRTFFclAyNUJ5Sm0wNWxBWW5BM2p1c01LcTB2cXMxakplRXMzbnkvVTQrNXJwQlp1YmpvaDBOa21GKy8xN2hZUmNBS0J4aUpiVi92d0F1SG5vdDllZEdWS2hSR3dHVjk0dVdBRDZ1UmljemQ5Qi91VnVJdXgwd0t4M0hOamhTKyt3K0tyUFgxTjRSUERzeW1ZK1Z3SEtMYUtDbmVZUEdDWGRsd0pDNkdnNWFUZzR3N1U3aysrVm5RWUJBa1I0RUZVd1k5RXN3ZXBUR0tuOGpzOHhxQWduZWFXckUzSEl4NTNuWWw4dGJ4REVHOVdZa042SXRVZGQwNzlGeWJpQ1BaWWhiQkhwak5TcEJZWnB0bDBsQVo4UkFBUkJCTkl1TVMyNnB5RVVoU2hsWkVqd0JGOFNVeGhTRFdETXBocEtVcEZWSzBTWWxhYWNBSWFieU9FQVdFNzFKTU1FbFRCWTFVUlZ0M0Y2SmR0RXEycmtOTDdnRGgwVUx0NEZQdndEb0o4YWx2R00wMENQVm1aR2dKejcrbEFPQ25LeFhKTllnRUp3NEwwT2VZNUhTbFp5N2dHbkh4ZTQ2RXJ1YVduWDAyelVrdUt5LzVsRFRWZlgzSE8yWE5KODVYYXgvNS9TUXZ2eWIzM29SMUkzUmNqR0QwN2s1VTNOS2MycHpvamtKODhYTnQ1L2VmeThVZnd6bEJhQjdmT2Z0TjhMKytQNmI3NEU3RnIxaW5kZ2lkb2w5Rng1NSt1aTlEMkUxZ0NnQUxvT2JBN2NFVVlnUXVTaUxKRW9pdTdtSlE4d2RqdDMzN2pETkVscitRcURjbFZjeWdneEtYVGtMUjF3WENnQUlZRVhJL3pDVi9oangvWGcrRlU2RHROaWpBUEdjUlpzeHNNeERKVzhJK0pNeExxU05RMVBpcDk1K2hST3pMTWVKYzhwZDRObllqVXhXUENZL1dDYmE0K3VLTlJITStuYzVES2wweE5tNFlPR2g1TXFNekdKYi8wQ2ZZRUk3U0c4eGhMbWYyV0duRmNmbjYwL0RvNWdyZXhCaHB2U2tTR05XK3FoTW9ZRmt4VEUyOXhpSzNqeitaN2M5OXRwbnZ3TU9PdVF3WXBPbVJCTGllMGNkYzl3Sko1MXkyaGxuaVNyUFJoS3dsOVVwQW4yVHJ4WmRaVS9KRDc4eGorblBQY3ZKUGYzYThTSjl0WmQ5M3lta2lZd01yQVErQm9DYVRhckEzQkQxT0ExcmZKZXlrQTF5U1pqMm1zMmpFeXllczB6RnNkV2MybENiVm5yMGtCN1ZZM3FHWHFyWDZFbjlIMzhzOVVQL3h3Rlh6R3NZZ082SEZBZXAyZXJXQTNya2t5elJxMzl2cmYvc3cyN28vREgvSHJuOHUyM3NVVWNlOXQ4Ly9mWW44N2VPMDJlcmRzdjFMZk5CYnVzdExxV3BNTHhhR2M4MWozL0F4dVo1a3dqYUZJRVpRU2QxQ3N3Mit3ck1OZnNCekRQN0Njd1BmWTdtZ2dXaEw5UmlzQ2owcFZvT2xscGZEVlpZWHc5V2hyNVpXOENxMExkcUcxaGpmVGRZWi8xdHNONnBxOEVHcDc0Q0c1MzZHbXh5YkRiWTdOaThaMndKK2VPbVcxaWM4Wko5SFFNWUZTZ2VlNjNuZGFSdWxOazRsZjJYZFMzdTVZRm9jMzBQTUN2dGtOb2NtY2IvaWxQY3pXdGRHUkdpaTJqUlhnZHlMY0ZXSkZCUHU0b00ySURUUmhUaFU1ZmxOZmJYZmNyUkNibjZ5V2NuS2laMWdvTkd1VFY2VTZlcXMrcmtrV3YydUdHV20zS0RLUlhWSXJ5bVhiQkRlaXMrU0N1aFhYVkUxZEpVb1lvMStHc3pKSk5OaWM2ODNYOWVrUU45VUdqY2dCSkhqcEpZeW1LTmlDZWxpZ0lxS3RoazZXbFJ6cklYSXlQSDQ3ZlZEdWRPZmhUTmR5THAvMkg3bG92cTZSUmg3TUxJeElsMzZzV0RqVlBIcXhFM0tUSHlYUUpOTERvd3VpVFBKcmNwaUhSRXN1Y3VsRmR1bEk2NW13Q0pyMmF1L3dsM1V5N2czaGg4VDM5Vk12VHFzeW5vVEYzWDByZTN4UU5JdFh0RTE3QXlaTnJ0cE5EUUdranhqQTFwSnNMRVhrZDl3VWFxNUtpcVRlOXhtb3A1a2hhbXpXSzROc2dDZWkzZG1UdlY2TVNvK052Q0k2eklyQko1aTdXcm9nMVpCV1V0ZkROSitONG4xdFBLd2tPd3RiaWlIYURETWlQd1Q3aWJVenhQYjJGQXVrRzE2WkF1NWNEYm1jdmkzZk5YQitzKytrTjF0bnZHN3UxMDNXSWtpKzRydXBCaDUxeTF5MEpTdHJSYjVCYVFxYzJXRGJhT0pJMFY1RHBTZ3cyTEtkU210OEE5Y3hRZGpqQjBBMElzTE1odXNLZUZRMW9wM0hOd1dDbHV2R0FHaVBaSUpPbzc4bjc3UnVER1hnYUxNMGU3V1BScEZrdE5TTWtpa1BKdloyOGZOdGRzMHczWjFjamxtOFhpaXEvb1FZYTdxT2hGcGp2a0V4anlDeHdGQklHQ2dvUkNnb3pDZ2dsRkJBVjFFOVNPYkNqNVZTbW50ek9ucUVtM05KRVhiMDZmR2wvZzJ6UzNKaVB3KzNvZHhSNWJNeEtuNENqVzRRNmxDZ3pGQkk3aWdrQnBnb1RTQlJsbENDYVVLU2dvUzFDNzg0QW1XRkYrUWFBem9aVkVheDBLQ2FqbFJXeWlBQmJWc25xc3YxWUtBUXpoeTd6R0kzMHRsZzdUREFXb1NGa3RUMk1XSHJQa1IzMTMxK3ZKaStrcHJWZDNDZkJJNldpcGVRNUdYZ3VUVEFib2JJUHYxOWVEd21kNmxFdThWOGV2bFRLZ3dWRHVOTkdTNU9YYnFCejFoYVppeFFDWjVINTRhR1FsTW5PK2E2aGpsb2duUisvcjlOWlEwUmZoVnViMU9sSnNWK0ZwZFBhMkgxb0Z3a2NIdFFqOUlMMlhwc3BpbXdvRWFGS1ZzcGxxQ3pWaWdxSU44Q3g0dzl3eHNuSHNmckx0b1c1a1h6Z01lVHVmOWl0RWlvOUo2S0RNS3BpVldwalQ2SWZIU1JqRFJza1pOMFZsdHo1RHpuQndITG1xcUFCRjBFRThNa3FGQXpKMVJOU2NBWTJ1TTZjcURuQkZSdElvSFB0bUtZSlpYR1VKYWFBejVqaUJxajlpTldSRTBXdVZRcG5XNWtoUlU1dWtBbElIQkx6Qmg3RUVnT2lrMER3U3JhNUdvMkxhYkMzL2dFZHlSSXVzcmJMWEgvSFVoYTdCcmZoTGt3aVAxUjJKRDVTZEZqNEpPR29lY1hLaUhyVldVeW1MbFIxMEl6UHhEbzJ2YzRIM0ZKYXJOM3ppaVJsVmJrUW9lZHpqM0ZTeXl2aXF6YnFDYWt2NnRvbXlvMHhWQTRaUXNHYkJIR3BKd2hlaEtMQXdWbFd2WWplT3NBY2x5NnpVdE55bThLMy9VUXlqRjB5Qm1lcFJHejB5RWlldDRoVkYzVHRRVlpBUjdkR1MxMWJSVmpHSDZZNTc2dDQwTnp0a3RIcW1HeW83N2tpdjN0NWxCajIxc0p6VlBzWm81UTMxUFJOOGZVV05RWXBudXN4K1pTRExtdkREa1A1bGw0eVFqRGdpRUlyV0Fod1RDTVVsb1R0T0NJU1N0UUNuQkJxYXpoc3BvQ25nakVnb3V3SGduRWdvZjRsQXVDQVNLbTRBdUNTU1ZoYU1XNFFLVktoYUMzQk5JRlNYaEI2NElSQnExZ0xjRW9pM2xjUE5ZZ2RxMU4wQWNFOGszaStoeEFPUjBIQUR3Q09Scmh2bkRWZU5HL21FMVRJc3VBU21PS1ROYkU4cUhGYm43d1pBdEFnaUxvT2dWVXExMkhnZHFNV2JRQzNmbHVTQWQ4b0I3WU9nUXhCMFRDbHh3S2RBQXA4RENYd0pKUEJWS2RFdENMb0hRWStVNmtyOEROVGhWNkFPdndOMStLT1U2QnNFL1lJYzlIOXpwRXV3ejZ4cWN6blllZXY3UE8zNEV4L0d3L05CcUkxL0tJVnpGNk8vQVBvTWZOc1JFWDJoMC92Um9XRWpPR3UvNUVUQ2taZmRZU1p4TE1JU1dZQzdWVUcybzBSQmRtUldUZ2dEdzQ4VUNqSWszRXVvSllIREdIb0dwZzJKM2RtQmZ0VHRwU1VXTVdLVmd0SWNueXFua2U3OXFKdmRNN3hLekUvdUhlK1l0MFVVT01WWElLcWRoYUxXbytoUVRCT3Y3bjMvTktNdWJobXEyZ1dRVS8wS3lwWThyUkYyRitoUjFweXk2akp2OUkzTmowS05vQUNydDdvMG4yU1pheHJvZ1l1a05jZXE3K2YwNHluc0VoY1R5OG5UYWF6QS95RFhMeWRSaG9MY0tHeXl5dkU5UnRlVkdsMWR2ZysyODc2dlo3emtQRW9vU1NGdmcwMzZ3U2NDblJJa2hVdFlkd2l4N1ptWTlraFFKa2kvdWpneVEwT1RSalpvMDJlc1RraFFKa2hLbUlhaEQxSmZNWWxERWg2T0MvTDZFMitoT1NRb1pScENVM0JTcUlsREpjbEVOSmRtWkZIb2FUOFZvNzJXUUdldGxZa3dRamhuS1hoa1gxZkFGMkF4Mnc4OVBDdVA3MzMvSk4xRzJKYTVLdTVsc3NpUWp2emIzcDNnRmlqbk5GbnhIbXpJYkdDNVFWS0lUTlMrdnpJVUZvdGp6S25WSE1Ub0ZmV0VCY1VpZXJFaGhrZFJkMWtrdndhY3VuWnQvT1g1VVFSQ0NldjMwNEpISThLMDlnYXZDMlptOWI0WjNVM2VXdy9RdWVYRkF6UmNOVFBNalBxWlh0WjJJUTZFc28xMFdQYldKSERxMU9DSDZOMHVDVHAwVFFnaUV3cFZFYjh6ZlBkaFh6UmNuVm1yNUN0bmpqbHlDakt2cGRSbXJkWkdMZGZJSUZjYUplVnFKZk5BUk1qSXdGQkhadlk4UEFXOU8yd1ZNNXlrbVJuNWoyVWVVNUJmOEtjNWY0M0JXcXdZMFZHK2N2cnRsY0tLaW5Ya040UVNWS25sSkdGZ09NRURza3NuTGdYSk1TbjE2TUhnN01tYXE1UDg4RjRDY242N0lYTS9FWEt3RXk2QUpOcXo2M01JVEdHZUhRYUNkdE43Zk1qUUcvcXJ0QldRYXEwZnBlZXNkMStFb1Z4cGFERElONXJqbjR3RkJZU1hEZ04yTDUzZ0lDNDVlbjRjeEg5NEFNM2lDdVBZTENOL2ViUFlzWjlvaW4xL0cvc3BydnhLN0xyYWR5cXhDaXB5RmdWVW9JQVBLckNxRW5NbXREZlhQNWcyOW9JT3Fxa0pvZkRvemFtZzB0dnVMdmVrNmxWOXpYSW5lZmtvVTI2cHZLaS9lUC9pOTFycWxLUnlMdFhaODZIZEFXZjVaSHlSMldyRGFhYnNpR3VJSUhObjgzWld5ZE9UUTN1OXdLaXpxOG9EUUI0UGthSDdPeU5LY0ZKQUNneUNBS09jQlk0K0c1SGZYWUxhWFVqSXh6UFYwazA1bEdSSHVKemdKQ2VVMzI1T0xlWUFYWGI0NVZ0bUpZQTI1MWxtemllZ3BlWjZQWGNXT2JQblE3dUFjSnJNOE05VEtya2xiVGordUhqOXR1Qno1TElTTEc1eEJNbEdWUWVGYUMyektsUzhrZUIyY214VStqZ0lFQ25mU2JWTVA5VnZaenFNUXFFdFNmbmhYWlFseCtWOW1EMzZkYkZ2eklTNjIrZDltZWt0dHhmY1VQT3M0QTFCU2NMVTBMangwV2dQVnlmL1ZwUng1cHgzTmw3SkpaenJkd1hITzhJbE5KdHlGMHNvdTkrM00rSVUyVFRaTEN2RDZZeHdVeWhqOHc3akd6SC9RcXNXb0Y1bUlNR1ErNXcveXhGeWtwRHpXcExsakVJQjVacVZ3RENISnI4Y3ZhWk1ESE14ckQzb3dMcFErdVkxNXQ0YUFpUVpTSzhEYWpyQnNkcmNCQ2tsNHhBQ0poSzVoY3ZSSkFnYkVCWFErSmpPZEVxS2h2cG5Xc09zMWE2RExTT1hrRldvK1k0blIxd24veWpFVURxT0VlK0dmbjQxc3BPTGU1YU94T05sTG1rYzNPdzBWN2xlMkZiLytBZzYwM2VxVU9JeVMrWXdMLytwanBzeHlZbkN0QmNGUlZlZGNVejRXL0tKbHE2SENIdmxMczN3b0ZqUmNQU0FsVDNOd3Jackw5OVRoZDluRExEVkp5bVRiRW5RbkdwZ0phUk5JaHZKWmNnTnRoOFhyYmJwNjBhc2JSeGVqOTd0NnhNZTVQcHlxKzZUZnhWc3UzYW9mOGpJVms3VzRpYlhFb1ZUeXA2cDlxdFdta2dNMFJ4S2NMYVl1N3dKb3FVZjZKdmF2a3p2ejcvdnFJekhNN083UVdFMFc4M3FsUGVrZno5Smh2VDJuSjFaZG1XR1ZyRXRPQnV1NUdyR1BLR0FkUUp5SHFBRkFEdjVBQjN1cWg2R1VLRmgzdXhHcUtBeVgvQm5DdU4rVi9QQ09VMjNhaHFqQ0NyY1k0YWdKNGRRbUpkcjYyWW5aeWZuOUoydVFGRGNwc3hKUXNVRTJ5TStpS29WVkN2WDkxU2hCTk9OdUM4Uzh1YnRDTE9PdWhjN3JncS9PZG96RUVKcGhTcC9nTlRtUG5wejlWcFZ6OEZ5bytRNW1LVlc2UnJQb09XN3dSOGtGQUloSnBTM0xqdXFZK1FrSXZQcGo4dTlNdjhnODhLVkd5Y2l4MThwa1F5Mmg3bmw4Rnc2ZE83ODVjUEhJOFkwNzRTSTZNSlUwWkczNS9ubkZodXA1eVBvNE1EUlp3NlAzZi9uVHIrYmZqRDVjT2IreEtmUFBKeDhNSFZ2d2l5eWRNMlpvZVg2WUZSNzZsNTk1S0xlcStWZXZkWklpeDAzT1h2K3Jmdm0yWDJkR25rRmNSeDR0VXV6Tml6Vm53VlZtRUxoOE5CeElrdTVtamw0bkNKTmdPV3NaOUE3VFZTT0F2N3pReUhGSWFpaHJCRWY5SzVEQWRhV00zLy9UMDJiMUFkTXVLOWgyYXBSakhMTU1VYWkwRVNqOGNOOGpUL0tjY2JyTDlOdmJqb0l5enRZUW8wMngwNU1wOEJkNERSM2FWQ2JKNjRuWHBKSmVzbXI5aXEvM3J6SldQVUVldGZKYjRjMVBDdmc4WTB0Snd4R0FvNjFRSWN3djg5b1Z2TFBnZlozYzNXMmk3a2U5WXZpaUhLOGZVdG1XSHYwOU4xY1hYVVA3VCtWMXZoSWx0ZGRYeCtqcjFOdlhzWlo3NmR5NnpHODBjNnExRHNEbjV5dXlGYTU1VzlPMmhlR2hJK1NDcC93K2F5WnovODY1L2l0Zzh2cklManJicjlTMnJUZnVOMTczRDhLaUxTY2tmaUdULzh1U2hGSncrN1dZVDY1bEJRcjVFS1p0MkxBcUxjYUc4QVBiOGxGK3NQZTBISCtaWjhPVXFkWkpUa3hHUHhEWCtIazB2bHJoeE9Xa04yWWhZenJ4azNuS0FJV012MVBJd21ZMi9RL2EwOFhQeG1EdTlBNkNiMmR4VEx4YjB2bVc5Y1l2VmFaMVZLdGtpQmplbXlmeTFLVXczdzl5K1RydXVscW1EYTlybFpZZHZSQytXSy93dGkzbnh3cGRoc3RYb0pzcmsweWNNUjJMekFKbGZUMnpFSGVqcCtBSHNvdmVETzJ5WVZ3NWpleG1BZW1ubUJiaGFscGxweWNaVG5Cbm82ZVk4TDNna1lBakViUnFxZFpZTVJmSFh4VWZBYVNWKzl1RktNZGxINTc3Y2pkMFFHY1FjRVhzYUFkRUtaWWd2MkkwRXRzRk9GM2lTZEhrWlhhQWNBRWZEd1E4ZzhsY0hJY0MyNk04OURWaTdwMXh0RG5taUkxZFBvZ1ZmTVVQWkNibkoyalJoQ0UvOCtSSTFEai84c3R5clpMSjdmcFhGbzZMY2J0Ry9xUGhscklSbmtZSWNzTjZ3MXBQOWVzR0tZWi9ONDM4cFpDZmlVNjdjMjlXT0E4dHZEWWlKeWpUV0RFNVZaRWRnNG5WMjY3RCt2OU5CSWw2UHFqZTlrNGptanJHK1dOWm8yeEg3RUZvUDFZZk81YWdWY3BTeVd4MXJpUWMxMWxNTkM5bmJJYUVZcDN0NUZJNWZ1M0RQM0x6ZEwxKzZFR0JSaHNDWmE2NzdKNGF2K0QwN29kbWd4dTJoS0NuN3JvMk10Z01uZE5yMEVXTVBWOXh5eXRrZGNVSFNLRm9JWEFILy9tcmVYMEg1Z3BFcVVvRE11VDVQeDJNcndkdlk0M0dpOEExSXdRa3JhQzlvQ2orU0tKN1Y0d0FvZ0p3azVTOXdCeFZwM0RodG5LalpxLzJldUliakVIN1NzMnZkRHE2dURJOEdkMk0zbFhzbGxPdDBpRGRuWW9yc0M5NDIra2YzTWZyY2dwZXpNdU82TE1uZGpReGlGNzFON1FSNmVpQk9qbytHelNVbThwVWx0OVVCdHpES3JSYi8rOVowOGNUdjdkdllBanpoM2puVmZsSEczS2srM05jMjlWWGY0d25YbTFXazlJRGJZUWFZSm05THBzNk5hSm00VkIrWjFyaFRCVHJxNWJ6ZlY2L2NsK1hDc3J5VGVUMThLZVNmL213VEovVkd4UVVxbEEwN0FDQ05yRG1rS1VXN0tEdG5uYlpFMk4zU1ViZDlRK1k1L2Y5WU9BcDM3Zy9DQ0htdnlPc0xlc1Q5aUh4ekc0Q3kzcHFlckRxYTF4eTd1RW1jcDVOUXhvZTdLUGRpVnF1dkFYVGJpTE00dHFQdFhlUjdYM3JUT1VxQTNwVkhOV3AvTTdKQ2xsR250MFJ2dW56NjFNckxVS3JUbG1oQytRS2tYbGZBdWt4cjdZQkpVU0lCcm9yakVsV0p6V3d5Ylp4MlpzcnJLRy93SVZZLzl1UW5McU9Nek5ON0Rzd1hvazBTVzZGMEJNalJxbHVXV2ZxVUZMeGVuMXd0eDIrMGQzN2IvbmttOHcyRmNvMUdOTTF0SEg1Nnh4djhMVWFrWGFYci9DZnJYVWxMQXY4cHVQWlFsd3R6V2lXcHZQU0wxUW9DQ3BQRmFOdXNvQmwwSFdMeVoyaDNpMktEZlROcmFyVTRHNGFwQzFSVy9tcDJuSFptcjRvdUluTU04T0czZGZmVTJrb0hHVjhnbXIzT1dNTjhiN24xOUtYdjJjZlQvNmVGT1FmWTNtNk1vV2puZmQ1SWRFY05OTFlyOWRrVWhlVXZabUY2N0JhdkVDaHF2a1ROQTlwbzZzeThzMkJvamZwR283clozcDJuOXFpZG5HK2p4TjVCN1FMV2RTV21rdk9WKzZacjhtM3hoZXROUEtoZ21pdE52ZGVFSTlucmhJRlFpcXJtQ1FaZnNCZSs1MGtyQVBoKzhUcnVObnhJMW43ZGM1c3Jib3NtVUFISkJ5bTdMNlZmSlYzWnlPV2xqRlJNMGJsZkxNLzJJcnJQU2ZjdEVrSjY4c3VacUlmRUpqL0V4d0pMbTVaY2xWZWJidjZjOHlla1NkT0VTMldLQ0NpbHJVVnJVQS93R2ZCaFp4ZExDMG0xaG56RjhKRGlJVkRiMXRsWVhWM3p6L1g0ZVdZcmNkN0txZzVRT25KZnNzUkVaSE8yU1RTWVJhaFpxTjBBV3dtTTJGSkR3UHRkcVN1NkhEZ2xUMk5scVlET3RjVU9LU2VkYUZGS01uNnJoTjd5RXZCa3lCRTQ1L2xMOG9CUG1BS1VUL21BTnBaSDZkMXdWREpxdmNUYXJJSWZuQ1ZncjJ6Z3RvN2VDNHAyN2p0SUlPZEExczc1dC8vWjhqTVdQTnFxMVRLNnV6NnQzOW8xV0IxZU8xVnRCcWxJTVdFd1FpSmxCbU0vRlBScDd5RkxkdXJySmVOVXZWemlQVWd4blR5aUltVUQvWlZ5VUh2WTQ1dXI3VTJOVndKdFJnRExxbzlhQkhYalhaTjN1eVFTNmtzYllRbC9PS1lkRTRPOGVzT2xrNVloMnhXb1F5MFhIQVdwTTZ0U2ExSG1pb0doaXVDYXdkcXcvMWJPcy92ZmlFWVFRdEpya0VNY21xZ3lXZ3ljaVlkanRyTjJualhzMTVpMlRYNG9PUkJDRDlWSzJUbjU0OGV1ZjlxOGI3MXh3TjZ4dG1ZdEhWOWdmMit5ZHREMnlsOU5KdTJsRy9IcXBEODlLS2ZmdHNKcS9RTE5kckMwdEJpUkRXYWFVVnZxSGV1dHIyWmx0cG9kcGtLQVNwcTFKZjVQdC9ZR1U3Z05uWEx1L2IvK0RlenEwWEQwKzAxSzNYNXIvaUlXc3RNcXRIYjY0ZnRWZ3hocE9HZ2pjYms0c0pSZnhXVS8zTVFOZmtubU9yQjdmdUdEZU1wUm0vcnZ5QktiTHdxZWNLV0dKakdlM2NjalpPZENSVGVLVHlqNFhCZnl6OC80ZHJSWVJ5L3FSN0JjdTM4R2VvcnRITTVCbWlYNGFjNG1JTWpLdk1sOFEvM3F6VkM3bk5vL1B2WDRIVUlwQTF2bi8yVjBrUU1JUWtZQ05oVUtVa0RrRU5YVkw5QWNtd3NlUXlST0dwcTEzNWZhcFE4TUNyUEtjNTUyYkl3UEl0dk9BWUYybUQrYjBLa05pdGFsZ2pyVng0elNLdFlyQXNtUzZPaHR3VE5Hc0hjTVgreFQySTl1Rjd5SHZmZTJ5bC9zVTV4UFR3SStRamtOd0NHTHZGaXZxOFliV3FZRVJaMXkzUnVlcEFrcEYyQ2FieDZPcThCN25hSkFNcFhMK25YbDNoMU9CSExlL2JSNmVtUlZHUURrSVhVWktPaEM2VzFDNmlpOW1QZ0syOFlYV2hiaHQzemJQdm9RK1VKWDZZcmNra1Jkd3NoRGY5Z0M2aWFLckQvK0pQZjcxVjdGOUVHNXgyd3N2b0NYTEdMUFRDeGN1WCs2MFUxZ2wwRVhuN1FhN296dlVIdGdLL1hmZ0xma3RPeHEvb29wTTN1VkxHVTcrZ3VTMkFPU3lGbWdnRFV4L3lUWDVZeWl5dkkwTkttaWM5ME9Ka0p6djU4VStTWVd1YmpVMjNyYXBoNndyN3ZCVmFBY0ttMnpPck9meFZIb2FWNUY5TWtyZ0w4QmcxMmRZeDNIaysrMHFqUXE3bmNpUkc5VUlrVThSUE4vN0xUWDZ1OFFuUDNLaXkwcGRaT3BCV3FnWk42OFNra1ZKNWVnZGMyZDNRV2FHMHRGaFR0N0g4RzZpenRPRVhGRktZelJTclZTOXc2SUJyd29GUldITThGWUl5dVZaY0xrQkFIVmI4K2F2OHFRSnRLQkN3Tml2K01HTS9oa3RZZ2grcG1HRHlKdU90YTBwT2dZRlZNOXJNTWpVMG9vMnYyRDZ5NWFIQVB4bm4wZlBOYU1WT1owVnovWExJS0NUK3NGQTkveGVlelA1bDcvbnE3eGZ5WGxxL1VGbnh4clFrTWwweitLWnk2STFGZnZsVXpldXVIUXZLdFI4OXB1c3V5MWRxeVkwOTJOMVkzODNHRjYzK0RVOW1MbmxmTU54dUs4N00rTzZRLzRMdGtzM3p6ZnlxQWhtOHJXalU5aU84cFdpcnJiUjVYUGVoWmMyUk5aYjg4VmVyZ0ZyQStKTkJIK0lmQkxiOGp2K2V1MThKSUs4R1NsYWNzaTNaaW0vTFRzOE96Y3dTK2txL1JxeGU1M3hyaFZXM3NWQSt3VGVxMlZrYUs2Lyt3aVhiZmJtK0RITDZRQjVjeXFCTzdxRUIyaDAwOUxDRHRGeGk5SVptaHNmYnBsb3RJT1IzVmtJZWtQVFhWOStWL2pxbEFEZDFUai9wbWdrK1RRbGJjN0pobFZ6bWN6bGxYb2tGbzdkZ0dWNllGUWZjMkxsaGFMaHJ4cXYzM0hDUTdxQ2tETWhpSUNsK0pNa05vTkxydG1vYXB6QkF3OERXM3VIQm1mcXE4RUFmbnU2T1ZocnNRdmxIT2hEOGpoTWJZZEtvV0NLOVR2cjZtYlBvV2JQQlhDSDlyWlQ5aG5hQ2lNZGxxM29ONVQvY0lNTnRNWFo1bWZRZDFCMStabXlvZTczSEVrTkJ2KzRacXRjbkVSOFR2ODRCaTNJVktxOGJOUVMyMm80NFN1SVo4Z3AzVlV0Zk1jcFRDdVdjOEdvQmJWc2w0NGRNekk5aFNZWnZZQmsxaXJaWE1wWVlUMnYvbEFHOFlpV0JXbUNTV1lCR1ZWZjluZk96NTFtdXp2Z0ZQYU1tNTA0MnJKa3FjRzVMM3NrNndsOVR6eExySkJ3MFBnZDFIS0ZLSWtDWDBhTHJMcXFtR0dicUFwYUF6MjEyck9jTEFLdnNCMWtPTll3QXQvcG4vdTVmZnowNlh6S2g4VHRSVFNEOEcreENDVFRBUXIzdElMMkZVdXNNdnM0Tmc4T2g5WTBXdWNMcnJsQUZwZFppeGJkY1JXczhjR1BYelBCUSt3YWYrblVxdXNkUi9LY2V0c0E4NVRja2hVV2lha1Rjc0dmS3RveTJGSmdxbUY4bFdYOGoweFZLTTlIOEZTRHdNeDdmbTFaUW1jUXNSMWViRVc5V2k2UmVqYjVaYmpqOUtWVHlFZTZwTDROTjMxandkaTJzOEJtNEh3SXRBMHFid1hiWVFiNDdZaGdoNWRzSStmK1hZTDlRdm83MUxWSmQxZHhYZ25KMVJQd1YzSnV1TERuNzdLOVJxYStGN1dqalg4aTh3eE5MRHFNanBpYzc1NkRIb2ZFNEhtWUZzd3dPeDhTU3FZcnhvWEpYWHlXanBQaEl3ck8vK2l5RHRaVzlUdk9nLzdsZmo2cis2bzE3Q09QUzZvM0ZHMTR5M2xqOENSMnA5RzdZNEIycmRNVy9tQytUSjNUK2JneElFN3NTVGFYYThhcklwcDRPQVkxSFROQWxFTGswZmtkVFQxV2t2bE9nQWlYR0ZKVXkyU3orVDNzVXJhby9Ra0lqSkF4bFhOOFd2VlpzVGxhcVVveVNOVzNSK2txY2svRnBDa0tpTHBHZ3BBbStWc3MrbWtLZkV1WGt5ckhsVXFrVllreUpjYmtnVmtqLzlKYlBUUWg3eTNxRmZmenNrUFA5SEFvK2gxTDhJVkJyU0sxNCt0Mkt0WWEwWUlXdlBhbXd3WmFUQmNKeTJITUM5RWlLMUZzUWJINDRCUGljenFxenBQcVNsZFU2YmNZbDdRN1FpWHNLNmVscTYzRkNlVmIvSTIwV0RWYkFqQ0pHVS9TY2JrZDZkSnZkUEd3RFJSVzJuU0FrQnhYS09Lc1pVQ2crZ2FDM0VkdGhFSlJERVBURWlKQ1Z5bzloK0xETkJpTnVqUnFwaGtHa1dxMnh1aEdWZEl0K0s3UlZYTEVlclovVnowTG4zblYveUwrSE1rZnhsRmUxWGtldk8wemhUZGFjM0t0dVo3LzI1MHhYanptamRPRUhLUHVBbVIxbEloWTEvS3VpVktwYUxiWlIwQUp4UHpYWEtaTzJUUnJ2cm52N0c4YS96eFhtR3QrNVlUTzNPTENtbDZtcE9Hdm0rN2hvZVRhd1JWNWx1dndEdDgvQldENjNUaE51aHhXcEFlN05tOXNyZkxseGFmNnZpTVRTd2Z6NlIzVTQzWDIrNnVvaEYxL1BUM3F5a0dqYXRyMEZ6Z1FmUkptRkZpNDI5dzlZZ1dnVnNFOERsajFLNVJ4bUtYOWJCVFhVRVArUzRFQjIyamtoYmxlcWVSdTdCQ25Ndi9Ec3RSM0xueTk1U0Y2MSs5ZUM3NGI1OTQvZUg3RTlJQlYrT2kxSmxhZDdzKzNnQWlqUnNxbHMxVnYrRXhiWEVlUFJyOFA0cy9pc2ZUbGhOTjJ0dTNxTFY3NnlzWmFlTVczQXU5bnYxV3FPUGxYNFdYSEpwNXJJNHFKMGRtdlRYdWZlYS9acjhsM3ZSZnY5SnZzRGV4bHh3YXp6cXlrLy81cURLY2lUSmNOZ3hsNmpSQ2pWSzhvNXJhZmhZdWc2UkRsNXBzd2tXcW5JekZSTGlVZ09qa2ZJazJOelhtSi9pbVBWZzVrNExaY2xWSU1jN010RDM5Z0x4QlpWaTFvMk16dDBlcFl3elc0MXlOTmZkNURlUUxuR2hyTGNlK29ibkc5OE5OdzNXa0hHcU1YdUFtbHVocVBrY1UwOGNUcnJrOWJ6UCt2aXR5Smk1RzVjNXZ1ck1zaVlyQWUvS0J5c0dvRzVnQWFWOVNzV3RCd3VKNTQvVC9veTFSa00zUWgybjZycmRpTkNUaDIvVEtkVXhTdndPVUs5VWpFbkJXUG56b1dQN2lMbGwxUmFzWmJENWNiejUvdXh2cnVVOTNIU2FCN0U4eW4zUFJ2ZS9SUHM2UC9BV3VpTEJhL0RINTVNM1ZFK2tpUzllRDdEVGdDK3U1UVB4QXVxVjhWZDhvUXdYTmFYZ3ovTXIraXFiV3QyMEF1VkptTWhSRjNwWEVYSHF2dSs2dGhQNU1pbElvWGVxSEkyakEyV3R6ejV5Snk3NHNtWHlKenEyeWVPbU1yOVhwMkxUeHBjK05xd2JaNUZOczBDd0JVTTJJTFU0Z1ptNXNydE1mUytRTDJKbFpseGNPSElRT3FnaDRpbXdTdnphZUdvL2R6RHlqTE81NU9USUZNSnM1Z3FtRW1NT2ZISVhZZkJwODlRYm1BeWIzenV5OFRJM3Z0czBDOGxZY3IyaFZFazdlRlI1T2ozSmJhUm85OTVqMHovK1pMcjRET1FNMXkrYmJpZ082Ni9qYm05OHRQd1B0SFlsc1IxY1dXdHBsdHpac0dUTDcyVzZsVWJsbDk1NXQxdHViTHA3dmxOVHdYTVB6NHpnd3V6Skh0RW9hMDlIWXUwWEJFOC9aSDNUMnp0TVh0K2Jrd1VaZ2pZSXZlL2JrdDhQSVZaSWZnVS95MzhZcGQ1MXlNK3p1YkZoYUwzcDM1cXppa0gvMVh6Z1JnYlN2ejBiQW4vTWZHQkdia2xZYnF5KzRGNlM1N0ZYQkRDbmJYSkF4SEl3S1BQcjArLzY3TUhZdnhkK1dFcFBweDlZTzc3dVFNSDlpOThKUFlmcU5YOTRRd0xzVm9BcmpYNDl2TW5LcFI3bGN3SXQ2TERVQXBiclYvQlNzczdoNS9ES0FRMk50MitxcHJUZnVPUUFBa29NOTFLVXZmVldGZG5wZ281Yit6WmhOVEE0disyZ25ORTdHOVE5dEthK0wvU2FnRnAyaFp1elBxNXZMSEYvdWcrdHlJOFNSNnVKL0F2b212UFoxeG9wRzd6bGM4djBmSFlyNzRJcnVhdGVVVFNpbEw1N3ZaYWhGMXErUFJ6dUVvYURQZFZjVXNweWxXNFVxMGFMdE1Zak1tV1pONHJQUFl1UGsrdU40MktNM0tLanh0QTFyYk05Z1d2SXpiVVV4NFpKNTRqNWVpK2tNMkhxT1Z0WTBER21mM2p1L2psdGlHRnh6aHdjYVdRcFZSNkhmR1BOVjZWVWlHajNNQmsvWmZ5RVdQYnJxR091L01ZYUg0ZlNiQnNMUjFrdlZqZjdPa2U3c0hUM1RGcUExSUdwa3ZQVm0yM3JNWVNwSi9ueFVZWXRVcW1TSy85Z0UzUjBEcEE3Q2Jwc0xPMkxUdjJyeTBJalF0TWhVZVN1Rk1YaFBxVGR3bGtCVFN3YkRWVDdzZmNvYy9YckhYekVqOENXWDI4WTdLZS9wV09zMjk4dUVySFBEM1IzVEt0WTJiNGpHd1pOYXpoaUlxYzgrNmRpL2JvOHV5VjlWTzFYQXgzLy9na1p3SzF3NVBCK3BISkdvNkdtclp5d3FXU3dWZGNaZklvVlUyMHRtajM5YWd0UFgrTVBienpvS1hiN0pEREpxZFlhSElvUUgyclpzNEZJV21oTlZVNjE2T0sxMmVIVm1CdUFWTWNhK2NkWldwcVNPTTVXMnZuZGxTYW1sNnpheDd3NXFnS0ozNDhIMHBkajlqTFdaZ0laaW9qL3ozN0EvdmRlK3hseG8vc0NBYjN6MFMraWEvcUdaNjlya0VGZHByUHJVMU45R0lCV0hjdDR4RVYxUGd6VU1qd1F2cnZ0U1dsY1dhdUtGbkthUndEbU1velRXeXVwS0t5WFlVckpqOFhKdHphQ244NjJid3huNi9JU0kzcWJGMXR6SDYvMXU5bVY5WE5ybnI5YnZPbXd1VURKdGgyYnhuWjVibTRLWDduMUVMRDd0bmZMdzRVZmhEL2l6UWN2cEtVdkRRL3pRT3E2aWx5NlMveHpjaktod2VRQTk5VGJOOHJKUkUvTk1ocDZ2ekh1Ym9rUFVtd3lzT3dJS1czTTRHRy91a1JyaS9XSzYwUjFmUlhtMDJzSEZEeVByR3Z6bmlRRmdsdlZVUmYzWm5tUExFdVhISUpBM2lQOWNNc0RDZFd3MGFVbC8rbGYwYWZ1MElpYlYvWFM4UkZTbEZadTdHTG9JYVdQWFdGWmJmT0dQZ1dsVEI3REM3ZFc4NFRuakcva3k1N2FaTG5DTE9IYXoyWDBzTEE5L0RIajA5YjFxL0dFM29EVjFmKzczc2lvMEZRWmpTS2hCWmptY0JpK0k1VEp2R1YyVmdsWDRuTlRpazZjL1dLRytNb2V6TUVIV0lCN3g4K1huc1U2ZWtNSFhQb0RRRWYzMFUrL3VOaWhvRmJsRzhSZ29ZY2tZOU4xaEEwckpVdFk5TWRYZ00zejNyT3NqYnZZSFNPNXNkVVFrN085UnpOdnNKZHZUYTJXa1c3VlMrdW5GN1YwQ2t0a0hZMC9BditlVFB3Y2UzSHQvOEc1MFZ0Zno3OVJkdWZRdmxKNE1PZWtpM1JNVThrcW5jL2Frd0V1bVlmb1lsOXNWRWY5NVFBSDFML2w5aTQ1eHR0VklwVmZxaWZERHlzQWg3Mms3dGlVbXlpOC9sdlhLVW96ZjdBbmp2TGE2NVhaaTZYeVJaZXdoM2FrQ3YwbjFudU1EeS9LdXpjM0RQdC9BM0ZOcjA0ZWxrd1lVdkMxclVoQk9vVDR2Wm5ic1d0VXZGaXJFQ3B3RlNXazVKVkJPZ04rMnNFTUVWTmVYcEtjcUdIRkRqem42VjIzQTVqRHZ0NDhYYXFNcmM5cG9LOHBITUw1V1JDbVZHQ016RUlrb3FKeEN1ZVp0L0NNK3VocWpvdVU2U1NjM0V2RGYyamVKa1YraXpQL2Y4M0JQTUp6cCtDODF6U3Y0WDVyZ0x1a1oyWVR4L0Jod0hQNTJTNTFpd0NVUVM2bktEVVZtb2JCcmMxcGNzVHpQS2Z0aGNLTkhxaDJHeVV5SFBYRXZMRGhMdzZLTWozUkV6dTJQY3FuQW5KdFlLckVhNkNmeEltTEZxUkRzei9oczlSeVRxVU1rNzJ0RjZlcnhOdGZCbjdMeVo3Q1p1ZGtvMUpqbDBzLzA5ZTdqcjVydHc4UVZVODJKeEdiTjdKRUdvTlFySEZJRmZwWEpxMmdaMllkL1Byb1o2ODNEQXgzOEY3TVVPUUhSUUY5bmhNUk96eDA0eDhNblVCK0ZQczhWT2E1dnAwa3hXOG5OYTg1amlUNFFjeVQzVU5sbnhhRnYyVCt1bnpWUG1zb05PeFZQajVvay92aWtKd0VpU09BSmVSVVpscDJZb0QxRFVGSEw3VTZXSzdXTmw0UkFSMFBLem90UXJ6ZExsZEQvRXRiS3VnSVU3S3JMOWRMQkhSWTBsUkhUTFpTdE1zbWdPY1Q4NG1lK3gzU3Y0M1BEWG9YYU82M3E1eDVhbncrbENZUWQ2aEtIU2lJS0NjUVNyK0FwQkhvZEE3d0MvOGV2bXRTTnZ0ZXJGbmxVaUdNNHVTVTNtS25YTkNiakp5V2VZeGhiVTNpY3NEZ2dEdi9EaVBaYks3MndXREJwbSs3OXB3Tkd5NnRONHU4bHZBcFltOXNaY2tkNUhwLzA4NjZETjRsbWFjR1hwTEMrWjBFMkRPRys3bkhnTytMTm10aCttUjBVV2RWTld6NUtCOEh0NEJ2UGI3Zk9WMnYydkYyYjNCWXo0dTU2RkI0SnhLam5WcDJxUjRzVnBWZUFBMGFOZHlmZHl1aTlzM3F5QmkyTGROeVJua2RKeHpwV01mQVR4U2ZJU3YvY1N6dE4ydUNGS2c5MExDaFJDZUdNVVJKTzRBTlpyWFJCcERIOXNUZXlyeHZIWEcxME9VRk1DOFp3b1VUYkI3dDRRT0ZIbkpicDR0VTVlQXZ3aGdQYTZKSVZXRTVoSzNkUkhjK1hjRHdETkh1ckd0SzFoeFpmaUZ6R2NKa01TSmx2NVdxQzcwQUxCSWcwZkZFcjhUZlM4Q1RvQzFZVDIyeFFXWGZYanlNcm9WcGxUdFdZcXFDRVVuQmtLVk16S2ZzVzh5VWx6Tjg0ZTRXaG5wdTdhRzRTVytaQ2xyYUJzS1g1Z2lVMGtSSlV4d290amZLck9GSGFZTHFMdW1RMFVkUEVhMU9WVzVaU20rNkUzWmNTeDF3aEE2QlVTUi9IcWlibms1ak9DOVNZNHJYcEdXcG9vcTQzZDZDbThvcUZEUGdwVG5MZ0F3enRnUmQyOHdjQ0FoMitvVUVqOVNPeXdSV1loR1pZZVlyOW9QYUhTbHVIQ2k0U1orWHF2akVkbmNMdkRLYTU2Y0Vmelc0SUlYTDFzU1JjalpRd2oyUWdDQnJ3YUp5bzNXMlJDTDZReFpydDR6SUxWdEk0V2N4Nll2UVBiTk5qN01aQTEvRkh4M3UxSkFrUUtla0NlL1gvZG8za0o2TndaUXlWSzQzaUVqajlZNnRVNXNDTXQrcDlTaC9nM2dMaGZmWk1SdU03S3RPc0R0NnN4K0FXNzRxTkoyKy9sekcvUVo5cjllb3I3TkxETFpKYVNxNnpDdVM1dHlCcVhra0tkc0V1Q2hYN1U1TXh1ZFZRL21DWkRRb2FkUTlteXpEOTByVWVGWGhSMkVodngxakFTVWQ0VitMMGdORkdwWVBYL1krNnArUGJsZy9Ya0Y4T20vcjc2Ky92cnN5UmFud1dqSnNZSnVmcGZ2dGx2eW1pWjdsUUVuZjdEYUZmSVFjc0ZEWFVEUlF6RmVvZW8rV0hvM3FuWVJXRkl4UzV4czhrai90WnhYakFhblJqMEtoaVNXVDhkYWxZcnpWZDViVTYyTnlRSlNvOWFnQnVxYlVOOFUreEcweDVua3ZZVElNdk5uTzk0dnU4djNVVU52bmtKQVRmVGtwTUVHUW41OGpPNExQempNQ240bm5tRUEybDlTb21pbGNyZU5YV2RpWHozRDFPMUVPeU1YZU80eWVLTXc3QXBlNUlzdjFWeElnSXFURU9zOU5CMHA0dndjZGtkTkdPUnl6OTBSWVNsdVpsMGFXMHR5TExnd1BnMnBrdEJ3bUJGUURKY2hRSS9wMU9WT1FKU3JreUZteUw5Y3lWWU5IL3dRTTdTbUNQMEY5b251WkRCWTI4NWJPODhyclVrN2U1dEw5NTU3UGVjVGFsa25CVThPakxiWk93ajZ6Sm1oZ3FJOElWc0JTbGVWK1FNTTRYN1JYVURjSlM5ZksrMGNteFRrb211Zmd2ZmpzZ2twOXQ0b2RKZ09lZjdDVDNHMjJkRVIwbHNXRktQVElRaE5UdGluTmxUUGUyRWFZTnltUXpkTTA0aDhwM0kxYW82QUdRMHdOc1krbUdCMTRFMithZXBxUkV1TzhxSnJZUGQzU1V2S0owVEhQeDlxUk52a1pJcituWkx2aEthQVV3Q0EvZFlLZGVNTDNmSG1xbGh0THFMYmZVcXdMRnF3ZU03MUZwUmlSMjFEd0ZGVFcxSHZ1clZBWG9ZaHFTSEkxU04reU5GUGIxT2lMRDNPR2hBRG42aGZnSHlZS0VwRkZ6ZVJRSUQ0SWpKTFBSSlk5c0JmOGZVL1VPa05VVjNnNXhFQi9nY1l4RUN2ckV6aVY0MUxqM2ZZRjh5MjRHZlRiUHgvUlJIbFQzL0JBOUZIcEZRR2QydnFRY0o5c3R2WWRPOStxQWtpbkhGZURKNk5FVi91TGljS3JlQTIzTE5tZGpLb25seHVFUW1PZXpISktaa3czY015TitseW15ekt6djBreXJpa2FrS29UcG9pTjNaMUhaWDVkWXRRcHMyWk1hOE1lekNIbkpkSC9RTGdxclRhbmMzbmxLNG5Oa04vNVV5YlZWWklqNTVIWENjb2IyNkUyZ3d6UnF5VkJhQkM0dEtMWFgzZlF2dlZvTmdJdll0Q21rYldZR0draFl6Q1JleEhwMjYvOUJoWjV1aUJ5cEpRY1EwQnRUR3lUb3ZHbVZINEdHUGppcXNQMmpjMDdTakdUWkpvdzZjVEFKZmtHYjRPR1RIR1pjbnRkZHJ4SVUrOEdXdFY1K0hJdVYxdXFzcmlDMnlZa05rMmlTcFJLdEUyRDlTc040VXJkYkRrSTVjajdhZElCUnd4SjZaVmRXemlWeDB3aEJEUXdCVkpDcWp3RzllZEI2eHVJeEtRaWp6OG5RUlNic2ZxOXh6eUIrOWR1OXF0SC9BeHlDVmwzN3hJSEk0UlpvNm51TTRxQnNIQ1NHQXNKWlFZMjRhY28waTVSbTMwbEpMVzIvOUxkd3JqOUpIbEJWbGNUbFBNaHJ3cFZhcnpsbVNjaHpaSVB3ajNzUnJzUUFJNFljdDlSbVMrYVpPdXRuOE5JVVAzTUFENHJnM3VWUm0zVllCY3FjbVMyM1JRSFJPUlhKSjRnZDZvYWhxbmtpeXQwbU1NVEd4MEl5OW5ESEROWlhzOVJ6SEZRWkVaZ1dzMkUzWTFVVGhjMnVZb3plTHVPeTdCM2xldSt2cDh0alBXQ21FV1dkcmhJN2JsNXZ0U0VXUnF2czVwRVYwYkFJcVV0OFRqTElPVHlIWEpBZDNYb1gvaDVrZk9XbzFBWmFOVXFSS2dteHNMeHBuaXlqTS9RdXI3QUx4dXFwVzlFY1lhU0RUelo1QjExcmFwSmR3VWE2NUZtZndIRkNWcUZUWkZXQm9UMHNVaE5XZUE1OEl0R2szYU5JRnB6T2F3a05rVzduZkFmNExwRmxmemRTdldvS2h6WGJBQmdVUytEa1RFd0lQelBJWXlxYmg2MkdvMEczKy9vME5QdEFJbW5mVjA0ZlVNYUh3RmlkOWoxTUU4bXlJczAyN3p1ZjFYWVdsUjFzVmhVRHVEb2NPL29oaDFXVHpZYlA0YWtjYktOQm80SkljaTdDODVqa1FRenRYbU9BV0czNFlZNEhxZ3BERDVDSThpOURsdEZibmpEQUQwT1RuQ2pkamFTZ3VZTW9USWtNTnJlcVRFa0U3NGlQTlJqWjB6cWcyNm9SNnF0OXZzc0x0SElWNUNaSjRCTGVvdDdrUVFKM3k1NWtRNlZpa3QwZ0h3anZlSVFqd1JBNnFxMXl2YTNhb3B0N0hSaFovSTNaS0xRWFJhMWNLYmt4VHNTd3JYQXVJdnVQaEpFdnoyOGdEd3d0VnVidXM3WFBIS21NV21BYUJjQUJJcDRJTVNaMHBVM0pYUzM1SU5hZnRDaHZMenJMQkwxOXZQbjN6UVorQ3llQ0lTbklYVkZPWHNmaUVIK2lOelZVZEw4V2UvUGM4MXJQcjZaUVR4bFhpaTh0ajAzTmxxNlNOK1JIV2hUcGJzQXYrUzZNYVlJeEMvM1VpVHhYcFZIamczcmZJVW5MaUV2UXBHSkk4ekM0UGR5YzV3VGFQU3FLcXUzRFE0SXhpTUtJNktHNG9OQllrREhuRHpFWjQ1dWQxbUJNdDFXbEhseWNSZzd0R2lpUjlSTy9Pb2NNTjN6WDFRd3lGME1BVzNpMW50cW1VeWlTRjV4WmkvbGlBT3d4b1c5cGJSQ1pnbW1wSzNpd1dEckFhQi9FSXI3NVgzUk9JdUhTdzlsaVlDcnZwY1pHUk92Y1NqTkFuMG0ycWMvcUVVU3JaeTRoQ2U0MVNOV0xvMWpCNDZaQkVQcncvUUxsMWgrRmlnOUFFUlJhTTYzZFNQK3JxdTF3TXNjb09XbjA0Vno4WFRJc0FvVGxZWGFJUEdEVFFMcFBvdU14ZmFYTkEwd0lrWkpvaXpBSTdZNElwemM5ak5QRTV1VHFybTQzd3o5S0lCaS9laHpLakFrRGFFakxqUzdGRXFDTXBjNkhWbUV6TUpIOXMxQ3BsNERoTkNrMFphNFBYSjJYVjJ1THhZWFVBSTBOdlIrcmFCWVE4Q3YxQ1dPYUNYdythRllqa09LOVdvTkNxeXVVd1hVVUM4S05hSlM4NG1lTVNOYVlLSEtmdjN4aTRicHNybkdZamZXYklhUG14cTh0MXhyQU5GTEQzc04zNzNiTGd4bm9CNy9UejNSV25xek9jUnZmdWlCVHp6WXlIMHZIMFRqN3F5cnRiYWtKbkhualRibzh6ZmRQZWxwd1Vqb3lHdFpBYWxGK3lKZGFaN2dZNmU0YWZGSmJrd21PT0JUVHpPdTFVbTNsbitPVTh2M2paazVTOWpiSzhHS3FxZGFxcnhTNXRHUU9GbkUxVTdaQ3Y0RjRobmNXdk5nSGxGNkxZeFI3ckozZm5vcktHT1dqSzBlNTIxWnY5THZ6dFVsdHdrQzUrWkZFLzNRSFBuSEpudnVjemoyRldaMlExVkZTb2xEN0NoRkZTNmxGd09zU3ZobTRtcTdSZ3dxdHQxb25rSlg2M0hZalduRERadEVkZ3MvelRsWTRKdk1WZG51WDAwdEhDZ0JKWGZmczg4cG5KUDlVUWx6cXRXYXNPY2FuN2dsWFJjTmd0TkpkMVpPdlZNYmZwbG1PMjBnUmExWWN0SzdaMUQ4Yys3ODF4WGdJLytRK2g4dThTYjE2OWV2bmorOU1sNllKWjljeXhpUVBnQjk1QndxSCtIRFc3ZjRLVWltWHl1am9QN2Z1RTJlaHI3WDZwZXVzTU51dUo3aERCT3NJUzJ5UGp6WTJ4VG13L3NPVm8xbzFkRndPb1NUcUpGMVYrS3NVN3g1QWE0WkhMWkxNS251VUpjS0VFdDZRUDIvclpOUVRnakZ1K1VnUDRDSWR1YlhUc21MU3BwSFhOYjNtdXNlVHphZk5LbEVXVEQwNW1LU0RVZXVOemZqaTJoWk1SNWh6SEE3b0lRVm5RZnRRRDJYVk16Sm9WSE9rSzM1YlFIT1o2VmhFSUVjZTR5ekxNOWtPaHZXOG1HOWFEakFxSDBDRUVobnpFYUxBKzRoc3VOS2k2eVhnZWRDWVNpaXBmVS9UekhneFFFSng3ZTgxaURXK2dhT09QMmJzMmlYaHFaWTdrOE1vc2JnWGRKandVQzFOb1ozS244dGhxZHV5MFkzbE1DeG9OZWI4TTRDbXpCRjA4RThUVzVnWm1jcGcramgzeDNCTHl6RFBIR1p3eURVd0xPTjczRGQ0cmtkVTlQMENFcFF2Q3cvUWVsOUdvTDdTRTVKYld3Q3EzT0hmNnh2TSsySmZGclYveU1NcjJubmNGVmJNckhMdWRGUHBRQzdOS21DcjNXNlFmRndGWklrSEtrc2xUU2p1dEx3QXIxM3JJb2grV2xtcEJDU0RuUU5ZK1dKWXJ1MzlBMHhTWHluc1FlM21xaFFhZEdINWVTWmFWcVdvNVFOWFdCQWZvSUJxaFhDUWpsNUpCb2pGcE13S3l5QWxiRlA1alY3clgvcjN6SEtqVGljWjhReEx1UDZjNlkwakRPUURVYm8veWhLU0lXY1FqeHdzMGFyUWkyUktIbWd4aFFzRnAyM1NOZ3QzNHVhTnVaVHlDTVVmTFIybFp2aFlLS3c5YmZleFVuWG16SnhNTSt0SUVCbjd4S2RTc1B0WURuM1JyVXAxMnhFNjdRK0QxbUhDY0lIOTB6bTU2bEdCUHpKR0pyOXBLL0M5NzlzYTFXNDBnaUg0UkdiMVpLOE5aTmo4OEpWY2xxTDNYWmxYditOQVl0NFlLV1pBaDJjR3NUbjVSclRjTWJuL3BCZDl0U1hLZEUvR0lCTU9VMWQ1bDF5TVBmQzk0VDNMK0ZwODRrQzVZM3ZNT1J0K0VsYUNEditkajA4NlRySDQ1MExQV1NISmErRlk3Y3A1K0ZBYzQzL1h4UURIM2YxTUdaeFFYeEZNS0M1ZkZlVURXZm44RWFLU2lCSHZtWEcxMXRuVjFOd2hreWt1ZzRaampFMXRRV2lWcE9Vb2tXNFdBMytxa29TWnZnQzdHSDdMSkhtUys3ZGFJWXR2bmxLNnBEVTExb2E0cXVtSGpjemlzRTl3Z3FwbWNlSjhTbm90cFp0anc4WE1OeWhySVl2VXBoQk9acnF2WE0rdVNZcHV5VTlEK3QrMjBjU2dZUnlzcytPT2hvdkQ0bnphUThvanlKY2VNeDc2VWtjMyt5UjdWWkhIYXExbllHckl5Z1V5ZFRJVXowa0xNZnBmWjdkdndMbUFlVEczQTltMmhqdmxPN2hSTjBiekxYVWZNM1FDNzh5cWFRNENVOXRqUWZXT3k1UzVwTHB1YVlyQTFPQ2pkT1YxUWlZQkR4WGVZdnIrdUxkZllJSmNhaWN0WjVLckUxaFV5bjZVeTVhQ3lHMEttVHFiUmo5SVVRN0VlcEhlSFREMnM0K3lvQmo1dmZoNzI2dHRkNzlhalhhb3FkNDd1aUQ2dTdnMXllWjhxUDJhWTN0N1JwVjR6bXkvMDJyZ3BaUXdjbG5hQVluckpvbTlReVpPb01VdnlSNzA3TThISmpKalJOelBNV0ovMkFzRFQxSHNEVnVoaURVNi9zRUgwZUdBTzg4LzE0Yzc3Qk83clhNQTNzMmNFZU80WEZKYThnMHJQMDJMSDZkeFNucFE2MFF0eHU0NnlRczZmUXFNWHJPUUtlMlVzbXdnN0l1SzRVU3k2QlJGaXAwanRwZXlTa2RPWFVLemxJN3h1RXo1NXNyL1pYY0VWdUNjdldXOGM5UFdZQVAvQUwrSHI5Vzk4Q2E5ZmJOaEtyeWtRM3BSc2lDYzV6SERjdmpzMG9QcFl4M2E0blIxbTUrcXpQMjA1Q3d1Nmc4KzJUdCtSQXRTM09vOVdDd2I1QnNKc0xTLzltL3dNbjJwR1MyT1FQSGtNVy9pd1JQcTBwL0RXRnh0bWNPWGhrUHpVaU9ndlZNV010RVpqTExjQ01yKzhmQUIvLy9menppODlQejMxYkptKzFZZ1FWUG5JdjgrVjdQdEhrK3l3Rlp0LzVNVGhhcjd4MGtaQ05iL0NOVSswK2ROdFFYQ1lYMEo0Vy9DelhCeUl3RHp1RlMrdW1IVFlOaVNKYUd5Y29SdWlRc203dVBaWjJrTFVCeDcyU0ZQdFVVekFZcXY2Nm9FZkh3WFY0K0VnTnBjbk1Tc2VJRE5tMkM0L2twdzdrOHROZ3d4STZkeTVSalBGRHh2cTVkNm5tb0JRSnVKeXNlU3B4eHFPTkxZV3Uyak9MS1o2bkpabnlRcHpzUm15OUVuQkFQQjAyZC96VGMyd3hqQnpCaWJpakxMWEppcDhPam4yM2EzS2ZJUzk5aEJTRTNYWi9TUENYYkZqOVgxUklSemNWelgya1NBblhPMGFIYUcwK1MyTHFFeHhnZTliOVZPN3pUOTUzYUNoOHpNVlVkSk1JbnQ0cGhVNmR0dFFiSk1oS3hvNmY0TXcvZjdFbWd5eElqaDEzWlArL2E0cGNaUE9FWlFxYlQ4a244cHdnOVF3WjdYSkZtNlcwUTNNbHJJVmUxQWV4TDFrSHkrOGtsbmVZbzgrc1BnckJjRXZGbW5LTWJSRjVLWG1TT0xMWXhtdmllZGVHSU1FekFNSGYyNUxkWXVXLzlCUFpsYVRXdGNnQ0ZrbmF4Skhoa3pJcnczQnRDV3JUQTR4RGtrS0pVTWNmWkhOMldTaUpYV0RrVk4vaUVNK2VqUlk4cVMxUDFVL0o2Z0lqcHdJTmhJKzZPajJPVmJzYUp2MDhMUlNFQm16bWYva3M3WG5kZnR2MjBqKzYwcFoyUGNEcVpOY3hBREY1NWlTNHFhZkpndHhQeWZmMGNUYzlFQ0FMSHFsbEVoR2ZPQjdCN2VhQ1l1L3RETHUxWldVS1l0Q0g3TTZuWXVpS1huTytRY0drVTJUOVJWdGMxNllVS1d0aW5WQVgwSWJRR1VISXFKejhHZS9DZWFmblhUSVh3ZzdCdko2N0p6dUhFbnVTeUtmUVpYQmwrcEFEKzdUNHZMTGZuaFREYUsrSTNvdE80RXBvQy9SekNTclZTMXczYzRyNzZCdTNWTlNiRVZtODkwQTVQSVpLMDVLQ1BxaHp2RVZyRlp4MmZJdk5vRFZqK2t4UTdsS25rTU1MV1ZqaWRwSC8xY1ZrRHJEUExiQlZwNXE0Y3RyRlV5YXNQQ3huMExhUno5OWJVNGpQZWxFa3NNUTYva1lHWExXWjBZYmVnU3ZSOHNXRTBwWm55eWxmRmpRY2I2RVY1UUZhbkhWcWZZY2YzcTdYd2lNQmdRejVHOHl3OGRCRDZDdVVPVXNRa1hVZ0NPRTVQWHFnS2lNa3R4WGR0bithUG1GZ0hNdjRwNmtHajV2YTRxVW1wN1Z5dlVjdjNTbzUxbnR0NTVWekhEbDd1SkpOdy9nd2pqNDEzb0Z2SzNUbHlibENIOG9lYlRKOUZqMXhUNUk5ZUtmNTZaaHZoOXByZnI0UmFUZW1waHZDZENKUUN6MjE2QWdNYXRPR21kNXBPV1dJMTk3RE1nM09LckhFb3dRUFZFOGVVTlVUYmplWWhOd1VseGtoZGc3SW1VZDM3RXZnYy9RN2g2bUJzZEpGNmhOeFkxaXFLa3lVYTBhWGZJaW1Jcyt4S2dwSEZxZ1Z4a3FoSVgyVHhjeXJNTjdnTi9MNU1MMFZyQnpBYmoxUW83RUkwU21kZWdtc1E1Q1B1cVNPUEYyNllDQ1FtWmhaSlRYeDJ5Ukh3eVl2YXBXbkpVZmxhdHUvRHJsaitDaEQxYmJtdDBTVjF2RU91d2YxcWhNeTRDaVVpdThjSjNneG93dHhkRlFnR3NiUUNIOU9YUnFFeU5PVnJwVGtoN2VBQTFhRzRxMGRVcjcyNnpQRjhDVXRYbnFrRFhVcUxGUEZPc0dacEpLTjhFVGlnSGovMzJBZXExSHRCV1VIN2dSZE1vY2ViWDF4MDgydjhKVzIrenc4S25xdGZWQktHN1FvalloMWxHTnFXS0FIbUtkbGJXdkpZbmloQ1lVamhhK1BXNkxiRk1pMm1UQTk0N0lsRGZlcVZLZ1dSWkluYWxzNmdCN1daNllBQXlCZGFydWYvSUlNZlJlVzV5VVJNcEhnbklmc1BYdUFTUUc2Uk5Va2F6Q01XMWpEOHdwdnIxMURQTWVUN1o2N1oydkZFWXRUeVZCUmNsVFdYWHpuRTVJUytUQzlENC9zQnJ2TUlMa3RFcWVwenJtYkpWa21UVXNkc2NnaUtPNDdnWlZXUTV3NGVIZi9ZRU5VRWl1YVNxQUFrT1hSdy9ZeFhkY1VXK25WVmJja0xVdjJVK3Zzck55d3dYcEhwTkFnSVRZVUtaZXNTa2hjelZtbGtlSSt6RzdCbnZnbTI0bUZINTBlWFFBODlyZWROWHYxSW52SGRDRVZVaG42Qk5uSDJJN3JyMUhxT3czSVlnTnp0Uk8veGZaT2JRWnN5d051eHgzN2hKYlk5YVpoNWVNNXZiZVdLRVBZMlBZZUNUcEM5Q0p6RDRNMm55cUdjZENTZU9vbEhtQkdMY21FSmNLMHFxeTlZTWhnRThMSkhYUXprY3FQeTFMRGtRVjlCczIwZ09hSHVtOFdHQXlMa1VtWmlzWVJFNVVmVXdMY1ZIclcvSVZWT2swSEV5QlB3ZXErNlo1aU12M1pndFRHNTFRVlpLanNLek5OSkdBck9FRUxaS2djallUL1A4TmlHdXRGTlNoQTFTSGxpV0UxUjUwVzFvUWNuV3R5cmU3V21Kcm00OE1PQVdEekRHUDkraldrWndrRTROQ1Z6eitjN1luL0ZZRHZBMkRWSGVQTDZTUy9oZHdydThld1hIbE5vMFlaQUFVREFBVDhtN0V2MHNTK1RqVWVIbzFDYnB2UE9ZaDhXRURtVlVLekpQT3g4anFxcEF5RVF4MXV6YW13Um5sUXBuUmcxaW9WdFVhbnorUm1nNkhUYXI5dVc2UDBlUlNwYXFucUt0eHFsUzNPRDFjYnNEVEVLMEJWYmNxckFJQ0l3ZW9ZOUlHc3NnNHFyWTF1cXRjbDY2OHEya0c0SkRxc2lTYWRKQ2x1cVpoSWJlMm9oZFF5eENzMHE2VTJtSXpIZ0g5Wi9jd0xTNDFYcDExYjd5Z2FOTmhWbzdUR1pkV1VodlJwRVI1MjUyTFdHbTNGd2ZNQVlxVk05ck1OelNtUUJjSitvQmpsRlVmNWxxR1c5TzdxNWVVMkZzcm9IQWF3RlZ1cXdJUzRnRzdKR3NPVlZ5dE9XTzVxQnhTUVd0ZGxWRFF5S2wxcS9rSkR1aW1UNnRvSzFPQmRCcUFaNXkyT21xcGdxeWZSaXMrUFhLRzhhdEtCT2xSU1pJWVBrNWFoSEJoQUN0cytJQ083NkZlK1IxNkNNR00xVlc1UVBRNXYwdGdPYm05eTVTN0poZjExaUtYV3NneDUvTFVDdWVxN1JkMkRvMDhZSW5Zd3FFOUtIMjJSVXVGVisxbjlKV3FHY3loKzFRMjFXcE1oTmdEZ2ZTYnozdXE3VGFIQlJTWWZMSFM1MHVzSVI2SXppUjgzUVRIRE1ZQTZDcXBzUUFCRHdEaEk4cTVvZGRXS2VZaHplRTF5ZUZWNU92cXlXQS9LeE9ZS0hXd1NaYnRNRjNmbGpFd241a1puSjBmLzZ5YnZ5ODAra3JneTF1YVB0dCtwdTFFR3JFZ3V5OG1iOGtXUlluOWZlV1VUb1BWMk5yanJXY2pMOHN6bFNwTzh0TWpLa0pUY2pwQUc0cjNXUEliY09DSzVhTkwzVzg5bGx1TWlUQ09yWjRDV1RZdkQ3ZllVdDRsQ0l4WEFQU0ttUnVKd1R5Tmo4MHdqVitHdFJrRTNyVkZ5blU4YlpYcWtmL0hhTE1oMVlPMDY5T3ZTcUY2RGJrUi8wcFVvVXF5QzdpYjlpSVlJcWtYVWkwODNHbDF2YlFJWWRFMWF0Q0FTOGRBNUdxeHdrSWNKY2d3RHoyTzdkUEFKQ1JGbjZ2VTQ3SXR5Ykx6b1BycFdrcEtCbzNhczlLRnZuVkhORWJsamM4V1FSdTNhSm9OcnI0anVFVnlvamsrUGJ1MGFOR3JUNkh0YmxzZXdGQ2lYTFpFM1VBM3RJRlNva0hoQUtkNng0UXhwUC9RdEdPN1hwVjZwbTdVS29Ya3B2S3pyQlRFOG9FRUhtVHQxQzJybDBhaVd4RUFxQmg2OWd2eUlkSDRqdE9XUDM3OXFodHUxNldHbUx0amJJcWd1OHRMVUNObkhHV1JGclZxc2NQdGNqU2ZZeGM4dGlvZ3VrcE51YnE0eHM3Q3lMWFRyVmVmbTRlWGpGeEFVRWhiUlRWUUtYYXFZdURUcE1tVEtraTFIcmp6NUNoUzY4aWt0VWFwTXVRcVZxbFNyVVN1aGJ1bGMvU0FJYk8yL1B5cHFHbG82ZWdaR0ptWVdWZ2didXdvT0tDY1h0MHBWcXRYdzhQS0Y0V2V2ZU5Wa245bm5OZTk1MjdmKzlFczQzckxCeXo2T0lBbnZSc1liWnRvU0U3N3psOU5PT2VNbi81cHZydi9jSkdDalcxeDNxemN0c0hRWlh5K2EvVzV6MXpMTC9lOTJQL3JRR3F1c2RvZHZIUGFtdXpScVZuMXNtejN1MTZuRHcrREVmNi9DZW4zdENRUDZEUm8yNUpJZlBXL0VtQmNkY3NRRWE2T1FpbUdHVzJlejlVWVlhWXl4WmhsbHRObGU5M2MwTW1PS3FTYkZnbmRpSlJ1T3hvNXBwdit3RHNFSWl1RUVTZEVNeS9FR284bHNFVVJyUFhCUFd5T1RDVEtUZ09LZUVEdklDZkpHbFVjYmF0dTdvMXNXUFhZSjRucnNUTHkxNkwvMHJpN08xOVhkMjlPUkFEQTdibmoxZWRoc0ZpK21rV0ZIOUxFNlgrQ1Z2T21KbHZCZmlJQzVOL1hFdDdjRnoxWjNiNTRuTHUrYmJMV0VtWDhyYVd0akdIMXBxTEdQekhPY0hzbWl4ZW14dGEzeGJTa1R6TkVKZ0Q0RkFLQkF6aFRnUUFFQWdCd28wRE1GQUFwd3VNZ1VRdjg1NXAzc0hFNzAzb1ZoTkl1T0tzK0h3N1R6d3lCRjVCejJmV1JSU0FrYmZQSm9aZWVYdkZFa05TRTFpS1ZOSkQ5SW82ZFBkQTVyZktNem9WdUVqRUVUbEJmUTZDVjdjMnZuQzZNWHJwVkcyaFN5NUh5Tzhlcjc5dTRIOGxiNGtYVExlQ1IzQXdBQVwiIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==