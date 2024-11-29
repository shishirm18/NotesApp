const { postNote } = require("./index.js");

describe('Test Handlers', function () {

    test('responds to /notes', () => {
        const req = {body: {title: "test 1", content: "content 1"}}

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        postNote(req, res);
        
        expect(res.text.title).toEqual("test 1");
        expect(res.text.content).toEqual("content 1");
    });

    test('title length greater than 50 should be error', () => {
        const req = {body: {title: "asrgagasjhbfkjsbjhabslfjvbhlajsfvbljafvbjlhfbvjlhdfjhabvjab lvjhablfvbjabvhlajfvblja lvjablfjvhbaslj vlajfvbljab vjlbhvljabh vlajvbljahb vajlhbvljfhgblajs vljafbvlahbvjabvlhf", content: "content 2"}}
        
        const res = { text: '',
            send: function(input) { this.text = input },
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        postNote(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        // expect(res.text.content).toEqual("content 1");
    });

    test('title not present /notes', () => {
        const req = {body: {content: "content 2"}}
        const res = { text: '',
            send: function(input) { this.text = input },
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        postNote(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        // expect(res.text.content).toEqual("content 1");
    });
});