import { CepRepository, CustomerRepository } from "./repository.js";

$(document).ready(function() {
    const customerRepository = new CustomerRepository();
    let customerId = undefined;
    
    $('#alertCpfError').hide();
    $('#cpf').mask('000.000.000-00');
    $('#postalCode').mask('00000-000');
    $("#registerForm").validate({
        rules: {
            cpf: 'required',
            name: 'required',
            birthDate: 'required',
            sex: 'required',
            address: 'required',
            district: 'required',
            postalCode: 'required',
            city: 'required',
            uf: 'required',
            sex: 'required'
        },
        messages: {
            cpf: 'Obrigatório',
            name: 'Obrigatório',
            birthDate: 'Obrigatório',
            sex: 'Obrigatório',
            address: 'Obrigatório',
            district: 'Obrigatório',
            postalCode: 'Obrigatório',
            city: 'Obrigatório',
            uf: 'Obrigatório',
            sex: 'Obrigatório',
        }
    });

    getCustomer();    

    $('#postalCode').keyup(async () => {
        const val = $('#postalCode').val()?.replace(/[^\w\s]/gi, '');
        if (val?.length === 8) {
            const cepRepository = new CepRepository();
            const result = await cepRepository.getData(val);
            if (!result.logradouro) $('#address').prop('disabled', false);
            else {
                $('#address').val(result.logradouro).prop('disabled', true);
            }
            $('#district').val(result.bairro);
            $('#city').val(result.localidade);
            $('#uf').val(result.uf);
        }
    });

    $('#btnRegister').click(async () => {
        const isValid = $("#registerForm").valid();
        if (!isValid) return;

        const data = {
            id: customerId,
            cpf: $('#cpf').val()?.replace(/[^\w\s]/gi, ''),
            name: $('#name').val(),
            birthDate: $('#birthDate').val(),
            sex: $('#sex').val(),
            publicPlace: $('#address').val(),
            number: $('#number').val(),
            district: $('#district').val(),
            postalCode: $('#postalCode').val()?.replace(/[^\w\s]/gi, ''),
            city: $('#city').val(),
            uf: $('#uf').val(),
            sex: $('#sex').val(),
        };

        try {
            if (data.id) await customerRepository.update(data);
            else await customerRepository.create(data);
            location.href='../index.html';
        }
        catch (ex) {
            console.log(ex);
            $('#alertCpfError').show();
        }
    });

    $('#btnClear').click(() => {
        $('#registerForm').trigger("reset");
    });

    async function getCustomer() {
        var urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('customer-id');
        if (!id) return;

        const data = await customerRepository.getById(id);
        $('#customerId').val(data.id);
        $('#cpf').val(data.cpf);
        $('#name').val(data.name);
        $('#birthDate').val(data.birthDate.substring(0,10));
        $('#sex').val(data.sex);
        $('#address').val(data.publicPlace);
        $('#number').val(data.number);
        $('#district').val(data.district);
        $('#postalCode').val(data.postalCode);
        $('#city').val(data.city);
        $('#uf').val(data.uf);
        $('#sex').val(data.sex);

        $('#btnRegister').text('Alterar');
        customerId = id;
    }
});