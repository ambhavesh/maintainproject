sap.ui.define([
    "./App.controller"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("maintainproject.controller.View1", {
            onInit: function () {
                this.readProjectDropDown();
                this.getModel().setUseBatch(false);
            },

            readProjectDropDown: function () {
                var oProjectModel = this.getModel();
                oProjectModel.read("/PROJECTS", {
                    success: function (oData) {
                        var oManageProjectModel = this.getModel("ManageProject");
                        var oAllProjectObject = {
                            "PRJ_ID": "All Project",
                            "PRJ_NAME": "All Project"
                        };
                        oData.results.push(oAllProjectObject);
                        oManageProjectModel.setProperty("/AllProject", oData.results);
                    }.bind(this),
                    error: function (oError) { }
                });
            },

            readProjectItems: function (sSelectedKey) {
                return new Promise(function (resolve, reject) {
                    var oProjectModel = this.getModel();
                    var sKey = sSelectedKey;
                    var oProjectTable = this.byId("projectTable");
                    this.setBusy(oProjectTable);
                    oProjectModel.callFunction("/readProject", {
                        method: "GET",
                        urlParameters: {
                            PRJ_ID: sKey
                        },
                        success: function (oData) {
                            var oManageProjectModel = this.getModel("ManageProject");
                            oManageProjectModel.setProperty("/ProjectLineItems", oData.results);
                            var oProjectTable = this.byId("projectTable");
                            this.hideBusy(oProjectTable);
                            resolve(oData);
                        }.bind(this),
                        error: function (oError) { }
                    });
                }.bind(this));
            },

            onProjectChange: async function (oEvent) {
                var oSelectedItem = oEvent.mParameters.selectedItem;
                var sKey = oSelectedItem.getKey();
                await this.readProjectItems(sKey);
                sap.m.MessageToast.show("Project data loaded sucessfully");

            },


        });
    });
