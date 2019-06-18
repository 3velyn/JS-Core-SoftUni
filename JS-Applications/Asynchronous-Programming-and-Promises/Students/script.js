function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJXTsSi-e/';
    const appSecret = '447b8e7046f048039d95610c1b039390';
    const collection = 'students';
    const username = 'guest';
    const password = 'guest';
    const authHeaders = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    let lastId = 0;

    $('#load').on('click', getStudents);
    $('#add').on('click', addStudent);

    async function getStudents() {
        try {
            await $.ajax({
                method: 'GET',
                url: `${baseUrl}appdata/${appKey}${collection}`,
                headers: authHeaders,
                success: showStudents
            });
        } catch (err) {
            console.log(err);
        }
    }

    function showStudents(students) {
        let $table = $('#results');
        sortStudents(students);

        for (const student of students) {
            let $tr = $(`
                <tr>
                    <td>${student.ID}</td>
                    <th>${student.FirstName}</th>
                    <th>${student.LastName}</th>
                    <th>${student.FacultyNumber}</th>
                    <th>${student.Grade}</th>
                </tr>
                `);
            $table.append($tr);
        }
    }

    function sortStudents(students) {
        students.sort(function (a, b) {
            return a.ID - b.ID;
        })
    }

    async function addStudent(e) {
        e.preventDefault();
        lastId++;

        try {
            let $firstName = $('#first-name');
            let $lastName = $('#last-name');
            let $facultyName = $('#faculty-number');
            let $grade = $('#grade');

            let studentInfo = {
                ID: lastId,
                FirstName: $firstName.val(),
                LastName: $lastName.val(),
                FacultyNumber: ($facultyName.val()),
                Grade: Number($grade.val())
            };
            console.log(studentInfo);
            await $.ajax({
                method: 'POST',
                url: `${baseUrl}appdata/${appKey}${collection}`,
                headers: authHeaders,
                data: JSON.stringify(studentInfo)
            });
            $firstName.val('');
            $lastName.val('');
            $facultyName.val('');
            $grade.val('');
            getStudents();
        } catch (err) {
            console.log(err);
        }
    }
}