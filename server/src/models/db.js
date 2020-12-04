import mongoose from 'mongoose';
import config from '../../config/config';
mongoose.set('debug', true);

const db = () => {
    const connect = async (done) => {
        console.log('Connecting to MongoDB...');
        let mongooseUrl = config.mongoURI;
        console.log("mongooseUrl-----------",config);
        // var mongooseOptions = 'maxPoolSize=5&minPoolSize=5&socketTimeoutMS=2000&readPreference=nearest&readConcern=majority&maxStalenessSeconds=90';
        // REPLICA_SET ? mongooseUrl + '?replicaSet=' + REPLICA_SET + '&' + mongooseOptions : mongooseUrl + '?' + mongooseOptions;
        try {
            await mongoose.connect(mongooseUrl);
            console.log('Connected to MongoDB');
            mongoose.connection.on('error', function(err) {
                console.log(err);
            });
            mongoose.connection.on('disconnected', function () {  
                console.log('Mongoose default connection disconnected'); 
            });
            process.on('SIGINT', function() {  
                mongoose.connection.close(function () { 
                    console.log('Mongoose default connection disconnected through app termination'); 
                    process.exit(0); 
                }); 
            });
            done();
        } catch (ex) {
            done(ex);
        }
    };
    const getreadystate = async (done) => {
        done(mongoose.STATES[mongoose.connection.readyState]);
    }

    return {
        connect: connect,
        getreadystate: getreadystate
    }
};

export default db();