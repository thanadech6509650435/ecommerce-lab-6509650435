const request = require('supertest');
const app = require('../app');
describe('Product API Tests', () => {

    describe('GET /products', () => {
        it('should return all products', async () => {
            const res = await request(app).get("/products")
            expect(res.body).toHaveLength(2)
        });
    });

    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const res = await request(app).get("/products/1")
            expect(res.body).toHaveProperty("id", 1)
            expect(res.status).toBe(200)
        });
        it('should return 404 if product not found', async () => {
            const res = await request(app).get("/products/3")
            expect(res.body).toHaveProperty("message", "Product not found")
            expect(res.status).toBe(404)
        });
    });

    describe('POST /products', () => {
        it('should add a new product', async () => {
            const res = await request(app).post("/products")
            expect(res.body).toHaveProperty("id", 3)
            expect(res.status).toBe(201)
        });
    });

    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const res = await request(app).put("/products/1")
            expect(res.status).toBe(200)
        });
        it('should return 404 if product not found', async () => {
            const res = await request(app).put("/products/10")
            expect(res.body).toHaveProperty("message", "Product not found")
            expect(res.status).toBe(404)
        });
    });

    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const res = await request(app).delete("/products/3")
            expect(res.body).toHaveProperty("message", "Product deleted")
            expect(res.status).toBe(200)
        });
        it('should return 404 if product not found', async () => {
            const res = await request(app).delete("/products/10")
            expect(res.body).toHaveProperty("message", "Product not found")
            expect(res.status).toBe(404)
        });
    });
});

