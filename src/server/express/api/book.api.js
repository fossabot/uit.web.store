import { Book, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.get('/api/book/:id', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const id = Number(req.params.id);
        const book = Book.getById(realm, id);
        if (!book) {
            res.json({
                error: `Không tìm thấy sách có Id: ${id}`,
            });
            return;
        }
        res.json(book.json);
    });

    app.get('/api/books', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const books = Book.getJsonBooks(realm);
        res.json(books);
    });
}
