sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    // developed by bhavesh
    return BaseController.extend("maintainproject.controller.App", {
      onInit: function () {
      },

      getModel: function (sName) {
        return sName === "" ? this.getOwnerComponent().getModel() : this.getOwnerComponent().getModel(sName);
      },

      setBusy: function (oControl, iMilliSeconds) {
        var iDelay = iMilliSeconds || 0;
        oControl.setBusyIndicatorDelay(iDelay);
        return oControl.setBusy(true);
      },

      hideBusy: function (oControl) {
        return oControl.setBusy(false);
      }

    });
  }
);
