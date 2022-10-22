// async import so that we are able to patch
// and trace things
import("./monitoring/trace").then(() => import("./start"));
