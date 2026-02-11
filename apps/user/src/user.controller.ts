import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(id: number) {
    return this.userService.getUser(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser(data: { name: string; email: string }) {
    return this.userService.createUser(data);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(data: { id: number; name: string; email: string }) {
    const { id, ...payload } = data;
    return this.userService.updateUser(id, payload);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(id: number) {
    return this.userService.deleteUser(id);
  }
}
