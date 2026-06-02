import { Inject, Injectable } from '@nestjs/common';

import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY')
        private cloudinary: typeof Cloudinary,
    ) { }

    async uploadImage(
        file: Express.Multer.File,
    ) {
        return new Promise((resolve, reject) => {
            this.cloudinary.uploader.upload_stream(
                {
                    folder: 'pesan-sini',
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(result);
                },
            ).end(file.buffer);
        });
    }
}