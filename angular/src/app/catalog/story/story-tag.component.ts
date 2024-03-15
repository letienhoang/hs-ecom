import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { StoriesService } from '@proxy/catalog/stories';
import { TagDto, TagInListDto, TagsService } from '@proxy/catalog/tags';

@Component({
  selector: 'app-story-tag',
  templateUrl: './story-tag.component.html',
})
export class StoryTagComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  btnDisabled = false;
  blockedPanel: boolean = false;
  public form: FormGroup;

  tags: any[] = [];

  constructor(
    private storyService: StoriesService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.initFormData();
    this.buildForm();
  }

  initFormData() {
    var tags = this.storyService.getStoryTag(this.config.data?.id);
    this.toggleBlockUI(true);
    forkJoin({
      tags,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          //Push data to dropdown
          var tagLists = response.tags as TagInListDto[];
          tagLists.forEach(element => {
            this.tags.push(element.name)
          });
          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  saveChange() {
    this.toggleBlockUI(true);
    this.tags = this.checkTagCoincident(this.form.value.tagStoryList);
    this.storyService
      .updateStoryTag(this.config.data?.id, this.tags)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next:(response: any)=>{
          this.toggleBlockUI(false);
          this.ref.close(response);
        },
        error:(err)=>{
          this.notificationService.showError(err.error.error.message);
          this.toggleBlockUI(false);
        }
      })
  }

  private buildForm() {
    this.form = this.fb.group({
      tagStoryList: new FormControl(this.tags || null),
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
        this.btnDisabled = false;
      }, 1000);
    }
  }

  private checkTagCoincident(arrs: string[]){
    var lowerArrs = arrs.map(arr=> arr.toLowerCase());
    var newArr = [];
    for (var i = 0; i < lowerArrs.length; i++) {
      if (newArr.indexOf(lowerArrs[i]) === -1) {
        newArr.push(lowerArrs[i])
      }
    }
    return newArr;
  }
}
