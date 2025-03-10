/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  keyId: string;

  @ManyToOne((_) => User, (user) => user.authTokens, {
    onDelete: 'CASCADE', // This deletes the AuthToken, when the associated User is deleted
  })
  user: User;

  @Column()
  label: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ unique: true })
  accessTokenHash: string;

  @Column()
  validUntil: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  lastUsed: Date | null;

  public static create(
    user: User,
    label: string,
    keyId: string,
    accessToken: string,
    validUntil: Date,
  ): Pick<
    AuthToken,
    'user' | 'label' | 'keyId' | 'accessTokenHash' | 'createdAt' | 'validUntil'
  > {
    const newToken = new AuthToken();
    newToken.user = user;
    newToken.label = label;
    newToken.keyId = keyId;
    newToken.accessTokenHash = accessToken;
    newToken.createdAt = new Date();
    newToken.validUntil = validUntil;
    newToken.lastUsed = null;
    return newToken;
  }
}
