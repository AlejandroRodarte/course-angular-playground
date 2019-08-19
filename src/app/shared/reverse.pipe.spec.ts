import {ReversePipe} from './reverse.pipe';

// reverse pipe testing
describe('ReversePipe', () => {

    // 1. isolated test: check that the pipe works
    it('should reverse the string', () => {
        const reversePipe = new ReversePipe();
        expect(reversePipe.transform('hello')).toEqual('olleh');
    });

});
