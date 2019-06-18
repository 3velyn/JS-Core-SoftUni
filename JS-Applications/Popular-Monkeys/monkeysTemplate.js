$(async () => {
        let allMonkeysHtml = await $.get('./allMonkeys.html');
        let monkeyHtml = await $.get('./monkey.html');
        let allMonkeysTemplate = Handlebars.compile(allMonkeysHtml);
        let monkeyTemplate = Handlebars.compile(monkeyHtml);
        let context = { monkeys };

        Handlebars.registerPartial('monkey', monkeyTemplate);

        $('.monkeys').html(allMonkeysTemplate(context));
});

function showInfo(id) {
    $(`#${id}`).toggle();
}