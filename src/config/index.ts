

// import a form 
import defauilt from "./config.defauilt";
import dev from "./config.dev";
import pro from "./config.pro";

let config = defauilt;

if (process.env.NODE_ENV == "production") {
    config = {
        ...config,
        ...pro
    };
} else {
    config = {
        ...config,
        ...dev
    };
}

export default config;
