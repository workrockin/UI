(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["converse"], factory);
    } else {
        factory(converse);
    }
}(this, function (converse) {
    var infoDialog = null;
    var _converse = null;

    converse.plugins.add("publish", {
        'dependencies': [],

        'initialize': function () {
            _converse = this._converse;

            infoDialog = _converse.BootstrapModal.extend({
                initialize() {
                    _converse.BootstrapModal.prototype.initialize.apply(this, arguments);
                },
                toHTML() {
                  return '<div class="modal" id="myModal" style="background-color:white;max-width:100%;overflow-y:scroll"> <div class="modal-dialog"> <div class="modal-content">' +
                         '<div class="modal-header">' +
                         '  <h4 class="modal-title">Information</h4>' +
                         '  <button type="button" class="close" data-dismiss="modal">&times;</button>' +
                         '</div>' +
                         '<div class="modal-body"> Details.. </div>' +
                         '<div class="modal-footer"> <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> </div>' +
                         '</div> </div> </div>';
                }
            });

            console.log("publish plugin is ready");
        },

        'overrides': {
            ChatBoxView: {

                renderToolbar: function renderToolbar(toolbar, options) {
                    var result = this.__super__.renderToolbar.apply(this, arguments);

                    var view = this;
                    var id = this.model.get("box_id");

                    addToolbarItem(view, id, "pade-info-" + id, '<a class="fas fa-pen" title="Information"></a>');

                    setTimeout(function()
                    {
                        var info = document.getElementById("pade-info-" + id);

                        info.addEventListener('click', function(evt)
                        {
                            evt.stopPropagation();

                            new infoDialog().show();

                        }, false);
                    });

                    return result;
                }
            }
        }
    });

    function newElement(el, id, html)
    {
        var ele = document.createElement(el);
        if (id) ele.id = id;
        if (html) ele.innerHTML = html;
        document.body.appendChild(ele);
        return ele;
    }

    var addToolbarItem = function(view, id, label, html)
    {
        var placeHolder = view.el.querySelector('#place-holder');

        if (!placeHolder)
        {
            var smiley = view.el.querySelector('.toggle-smiley.dropup');
            smiley.insertAdjacentElement('afterEnd', newElement('li', 'place-holder'));
            placeHolder = view.el.querySelector('#place-holder');
        }
        placeHolder.insertAdjacentElement('afterEnd', newElement('li', label, html));
    }
}));
