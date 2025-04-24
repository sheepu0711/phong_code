import { v4 as uuidv4 } from 'uuid';

/**
 * Hàm upload ảnh vào local storage và trả về URL
 * @param {File} file - File ảnh cần upload
 * @returns {Promise<string>} - URL của ảnh sau khi upload
 */
export const uploadImage = async (file) => {
    try {
        // Kiểm tra định dạng file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Chỉ chấp nhận định dạng ảnh: JPG, JPEG, PNG');
        }

        const fileId = uuidv4();
        const fileExtension = file.name.split('.').pop().toLowerCase();

        // Kiểm tra phần mở rộng
        const validExtensions = ['jpg', 'jpeg', 'png'];
        if (!validExtensions.includes(fileExtension)) {
            throw new Error('Chỉ chấp nhận định dạng ảnh: JPG, JPEG, PNG');
        }

        const newFileName = `${fileId}.${fileExtension}`;
        const storagePath = `uploads/${newFileName}`;

        // Tạo URL data thay vì URL server
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                try {
                    // Lưu base64 vào localStorage
                    localStorage.setItem(`image_${fileId}`, reader.result);

                    // Lưu thông tin file
                    const fileInfo = {
                        id: fileId,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        url: reader.result, // Sử dụng data URL thay vì server URL
                        path: storagePath,
                        timestamp: new Date().toISOString()
                    };

                    localStorage.setItem(`file_info_${fileId}`, JSON.stringify(fileInfo));

                    // Trả về data URL để hiển thị trực tiếp
                    resolve(reader.result);
                } catch (error) {
                    reject(new Error('Không thể lưu ảnh vào bộ nhớ cục bộ'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Không thể đọc file'));
            };

            // Đọc file dưới dạng data URL
            reader.readAsDataURL(file);
        });
    } catch (error) {
        console.error('Lỗi khi tải ảnh lên:', error);
        throw error;
    }
};

/**
 * Hàm lấy ảnh từ localStorage theo ID
 * @param {string} fileId - ID của file cần lấy
 * @returns {string|null} - Base64 của ảnh hoặc null nếu không tìm thấy
 */
export const getImageFromStorage = (fileId) => {
    return localStorage.getItem(`image_${fileId}`);
};

/**
 * Hàm lấy thông tin file từ localStorage theo ID
 * @param {string} fileId - ID của file cần lấy
 * @returns {Object|null} - Thông tin file hoặc null nếu không tìm thấy
 */
export const getFileInfo = (fileId) => {
    const fileInfo = localStorage.getItem(`file_info_${fileId}`);
    return fileInfo ? JSON.parse(fileInfo) : null;
}; 