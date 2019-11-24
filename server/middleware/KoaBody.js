import path from 'path'
import koaBody from 'koa-body'

export const KoaBody = app => {
    const uploadFile = path.join(process.cwd(), '/client/static/uploads/runtime');
    app.use(koaBody({
        multipart: true,
        formidable: {
          uploadDir: uploadFile,
          keepExtensions: true,
          maxFieldsSize: 2 * 1024 * 1024,
          onFileBegin: (name, file) => {
            const dir = uploadFile;
          },
          onError: (err) => {
            console.log(err);
          }
        }
      }))
}