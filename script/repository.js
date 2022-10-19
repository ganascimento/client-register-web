export class CepRepository {
    async getData(postalCode) {
        const data = await $.get(`https://viacep.com.br/ws/${postalCode}/json/`);
        return data;
    }
}

export class CustomerRepository {
    _baseUrl = 'https://localhost:7024/customer'

    async getById(id) {
        const result = await $.get(`${this._baseUrl}/${id}`);
        return result;
    }

    async getAll() {
        const result = await $.get(this._baseUrl);
        return result;
    }

    async create(data) {
        const result = await $.ajax({
            type: 'POST',
            url: this._baseUrl,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json'
        });
        return result;
    }

    async update(data) {
        const result = await $.ajax({
            type: 'PUT',
            url: this._baseUrl,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json'
        });
        return result;
    }

    async delete(id) {
        const result = await $.ajax({
            type: 'DELETE',
            url: `${this._baseUrl}/${id}`,
        });
        return result;
    }
}