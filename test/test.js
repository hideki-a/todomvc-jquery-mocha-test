describe("Todo", function () {
    describe("Utils", function () {
        it("uuidが生成されること", function () {
            expect(Utils.uuid()).to.be.a("string");
        });

        it("複数形への変換が行われること", function () {
            expect(Utils.pluralize(1, "item")).to.be("item");
            expect(Utils.pluralize(2, "item")).to.be("items");
        });

        it("LocalStorageへのデータ保存が行われること", function () {
            var namespace = "todos-jquery-test";
            var data = { "text": "test" };
            Utils.store(namespace, data);
            var savedata = Utils.store(namespace);
            expect(savedata.text).to.be(data.text);
        });
    });

    describe("App", function () {
        beforeEach(function () {
            localStorage.clear();
            App.init();
        });

        it("todoが作成されること", function () {
            var e = $.Event("keyup", { which: 13 });
            var $newTodo = $("#new-todo");
            var title = "test";

            $newTodo.val(title);
            $newTodo.trigger(e);
            expect(App.todos[0].title).to.be(title);
        });

        it("todoが取得できること", function () {
            var uuid = Utils.uuid();
            var title = "test2";
            
            App.todos.push(
                {
                    id: Utils.uuid(),
                    title: "test",
                    completed: false
                },
                {
                    id: uuid,
                    title: title,
                    completed: false
                }
            );
            App.render();

            var $todoView = $("#todo-list li[data-id='" + uuid + "'] .view");
            App.getTodo($todoView[0], function (i, val) {
                expect(val.title).to.be(title);
            });
        });

        it("todoが完了にできること", function () {
            App.todos.push(
                {
                    id: Utils.uuid(),
                    title: "test",
                    completed: false
                }
            );
            App.render();

            var $todoView = $("#todo-list li:first-child .view");
            App.toggle.call($todoView[0]);
            expect(App.todos[0].completed).to.be(true);
        });

        it("todoが更新できること", function () {
            App.todos.push(
                {
                    id: Utils.uuid(),
                    title: "test",
                    completed: false
                }
            );
            App.render();

            var newTitle = "edited title";
            var $todoEdit = $("#todo-list li:first-child > input");
            $todoEdit.val(newTitle);
            App.update.call($todoEdit[0]);
            expect(App.todos[0].title).to.be(newTitle);

            $todoEdit.val("");
            App.update.call($todoEdit[0]);
            expect(App.todos).to.be.empty();
        });

        it("todoが削除できること", function () {
            App.todos.push(
                {
                    id: Utils.uuid(),
                    title: "test",
                    completed: false
                }
            );
            App.render();

            var $todoView = $("#todo-list li:first-child .view");
            App.destroy.call($todoView[0]);
            expect(App.todos).to.be.empty();
        });
    });
});
