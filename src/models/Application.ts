import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { APPLICATION_STATUS } from '../utils/enums/ApplicarionStatus';

@Entity({ name: 'applications' })
class Application extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ name: 'job_id' })
        jobId: string;

    @Column({ name: 'applicant_id' })
        applicantId: number;

    @Column({ name: 'application_status', type: 'enum', enum: APPLICATION_STATUS, default: APPLICATION_STATUS.APPLIED })
        applicationStatus: APPLICATION_STATUS;

    @CreateDateColumn({ name: 'applied_at' })
        appliedAt: Date;
}

export default Application;