import { CustomerRepository } from "./repository.js";

$(document).ready(async function() {
    const customerRepository = new CustomerRepository();
    getCustomers();

    async function getCustomers() {
        $('#customerTable').empty();
        const customers = await customerRepository.getAll();

        customers?.forEach(customer => {
            const sex = customer.sex == 'M' ? 'Masculino' : 'Feminino';

            $('#customerTable').append(`
            <tr id="3">
                <td>
                    <button class="btn btn-primary" title="Alterar" update-customer-id="${customer.id}"><i class="fa fa-edit" ></i></button>
                    <button class="btn btn-danger" title="Remover" delete-customer-id="${customer.id}"><i class="fa fa-trash"></i></button>
                </td> 
                <td scope="row">${customer.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</th>
                <td>${customer.name}</td>
                <td>${sex}</td>
            </tr>
            `);
        });

        $('[update-customer-id]').click((e) => {
            const id = $(e.currentTarget).attr('update-customer-id');
            location.href=`./pages/register.html?customer-id=${id}`;
        });
    
        $('[delete-customer-id]').click(async (e) => {
            const id = $(e.currentTarget).attr('delete-customer-id');
            await customerRepository.delete(id);
            getCustomers();
        });
    }
});