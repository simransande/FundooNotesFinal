import { TestBed, inject } from '@angular/core/testing';

import { NotesService } from './notes.service';

describe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService]
    });
  });

  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.Notes).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.getNote).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.updatenotes).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.collaborator).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.addCollaborator).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.getCollaborator).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.getNotesColl).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.setLabelid).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.deleteLabel).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.getLabelid).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.dragnotes).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.notesFetchImage).toBeTruthy();
  }));
  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service.fetchUserData).toBeTruthy();
  }));
  
});
